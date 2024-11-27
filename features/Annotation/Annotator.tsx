
// @ts-nocheck
import Annotorious from "@recogito/annotorious-openseadragon";
import OpenSeaDragon from "openseadragon";
import { useEffect, useRef, useState } from "react";
import '@recogito/annotorious-openseadragon/dist/annotorious.min.css';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const Annotator = () => {
  const [viewer, setViewer] = useState<OpenSeaDragon.Viewer | null>(null);
  const [annotorious, setAnnotorious] = useState<any | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [annotations, setAnnotations] = useState<any[]>([]);
  const [selectedShape, setSelectedShape] = useState('rect');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setImageSrc(result);
        } else if (result instanceof ArrayBuffer) {
          const blob = new Blob([result], { type: event.target.files![0].type });
          setImageSrc(URL.createObjectURL(blob));
        }
        setAnnotations([]);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  useEffect(() => {
    let osdViewer: OpenSeaDragon.Viewer | null = null;
    let ann: any = null;

    const initAnnotorious = () => {
      if (!imageSrc) return;

      osdViewer = OpenSeaDragon({
        id: "openseadragon-viewer",
        animationTime: 0.5,
        blendTime: 0.1,
        constrainDuringPan: true,
        gestureSettingsMouse: { clickToZoom: false },
        maxZoomPixelRatio: 5,
        prefixUrl: "//openseadragon.github.io/openseadragon/images/",
        tileSources: {
          type: "image",
          url: imageSrc,
        },
      });

      setViewer(osdViewer);

      let ann: any;
      if (!osdViewer) return;

      const config = {
        toolbarPosition: 'top',
        drawingTools: [selectedShape],
        drawingTool: selectedShape,
        drawingMode: 'rect',
        locale: 'auto',
        widgets: [
          'COMMENT',
          {
            widget: 'TAG',
            vocabulary: ['Person', 'Animal', 'Plant', 'Building', 'Other']
          }
        ],
        allowEmpty: true

      };

      ann = Annotorious(osdViewer, config);

      ann.setAnnotations(annotations);



      ann.on('createAnnotation', (annotation: any) => {
        setAnnotations([...annotations, annotation]);
      });
      ann.on('updateAnnotation', (annotation: any) => {
        setAnnotations(annotations.map(a => a.id === annotation.id ? annotation : a));
      });

      ann.on('deleteAnnotation', (annotation: any) => {
        setAnnotations(annotations.filter(a => a.id !== annotation.id));
      });

      setAnnotorious(ann);
    };


    initAnnotorious();

    return () => {
      if (osdViewer) osdViewer.destroy();
      if (ann) ann.destroy();
    };

  }, [imageSrc, selectedShape]);

  useEffect(() => {
    if (annotorious) {
      annotorious.setDrawingTool(selectedShape);
    }
  }, [selectedShape, annotorious]);

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(annotations));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "annotations.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="h-full flex flex-col items-center">
      <h1 className=" font-inter text-[40px] font-medium">Image Annotation</h1>
      <Card className="m-4 p-4 space-y-2 items-center justify-center">
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
          ref={inputRef}
        />
        <div className="flex w-full gap-8 justify-center">
          <Button onClick={() => inputRef.current?.click()}>
            Upload Image
          </Button>
          <Button onClick={handleDownload} variant="outline">
            Download Annotations
          </Button>
        </div>
        {imageSrc && (
          <div className="map-container flex flex-col items-center" id="map">
            <RadioGroup className="flex justify-center gap-3 mb-2 border rounded-xl p-1" defaultValue={selectedShape} onValueChange={setSelectedShape}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rect" id="r1" />
                <label htmlFor="r1">Rectangle</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="polygon" id="r2" />
                <label htmlFor="r2">Polygon <span className="text-xs text-muted-foreground">(double-click to finish)</span></label>
              </div>
            </RadioGroup>
            <div id="openseadragon-viewer" className="h-[40vh] w-[40vw] md:!w-[50vw] md:!h-[50vh] lg:!h-[55vh] lg:!w-[55vw] xl:!w-[60vw]"></div>
            <Card className="w-fit space-y-1 mt-2 p-2">
              <h2>✏️- Use the toolbar above to select a shape. Press 'Shift' to draw.</h2>
              <h2>⌨️- Press 'F' to Flip the object. 'R' to Rotate.</h2>
              <h2>🖱️- You can use 'WSAD' or click and drag to move the image.</h2>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Annotator;