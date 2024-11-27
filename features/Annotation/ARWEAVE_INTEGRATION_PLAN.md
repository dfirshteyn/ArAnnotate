# Arweave Integration Plan

This document outlines the plan for integrating the annotation feature with Arweave blockchain.

## Implementation Steps

### 1. Upload Images to Arweave
```typescript
import Arweave from 'arweave';

async function uploadImageToArweave(imageFile: File) {
  const arweave = new Arweave({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
  });

  const reader = new FileReader();
  const imageData = await new Promise((resolve) => {
    reader.onload = () => resolve(reader.result);
    reader.readAsArrayBuffer(imageFile);
  });

  const transaction = await arweave.createTransaction({
    data: imageData,
  });

  transaction.addTag('Content-Type', imageFile.type);
  transaction.addTag('App-Name', 'AI-Training-Platform');
  transaction.addTag('Type', 'Image');

  await arweave.transactions.sign(transaction);
  await arweave.transactions.post(transaction);

  return transaction.id;
}
```

### 2. Store Annotations on Arweave
```typescript
async function saveAnnotationsToArweave(annotations: any[], imageTransactionId: string) {
  const transaction = await arweave.createTransaction({
    data: JSON.stringify(annotations)
  });

  transaction.addTag('Content-Type', 'application/json');
  transaction.addTag('App-Name', 'AI-Training-Platform');
  transaction.addTag('Type', 'Annotations');
  transaction.addTag('Image-Transaction', imageTransactionId);

  await arweave.transactions.sign(transaction);
  await arweave.transactions.post(transaction);

  return transaction.id;
}
```

### 3. Fetch Annotations from Arweave
```typescript
async function getAnnotationsFromArweave(imageTransactionId: string) {
  const query = `{
    transactions(
      tags: [
        { name: "App-Name", values: ["AI-Training-Platform"] },
        { name: "Type", values: ["Annotations"] },
        { name: "Image-Transaction", values: ["${imageTransactionId}"] }
      ]
    ) {
      edges {
        node {
          id
          data
        }
      }
    }
  }`;

  const response = await arweave.api.post('graphql', { query });
  const data = response.data.data.transactions.edges[0]?.node;
  
  if (data) {
    const annotationData = await arweave.transactions.getData(data.id, {
      decode: true,
      string: true
    });
    return JSON.parse(annotationData);
  }
  
  return null;
}
```

### 4. UI Integration
```typescript
// Add to Annotator component state
const [arweaveStatus, setArweaveStatus] = useState<{
  uploading: boolean;
  imageId?: string;
  annotationsId?: string;
  error?: string;
}>({ uploading: false });

// Add UI elements to show transaction status
const ArweaveStatus = () => (
  <div className="mt-4 p-4 border rounded-lg">
    <h3 className="font-medium">Arweave Status</h3>
    {arweaveStatus.uploading && (
      <div className="flex items-center gap-2">
        <Spinner /> Uploading to Arweave...
      </div>
    )}
    {arweaveStatus.imageId && (
      <div className="text-sm">
        Image ID: <code>{arweaveStatus.imageId}</code>
      </div>
    )}
    {arweaveStatus.annotationsId && (
      <div className="text-sm">
        Annotations ID: <code>{arweaveStatus.annotationsId}</code>
      </div>
    )}
    {arweaveStatus.error && (
      <div className="text-red-500 text-sm">
        Error: {arweaveStatus.error}
      </div>
    )}
  </div>
);
```

## Implementation Steps

1. Install required dependencies:
```bash
npm install arweave
```

2. Create an Arweave wallet and obtain necessary credentials

3. Update the Annotator component:
- Add Arweave upload buttons alongside local storage options
- Implement progress indicators and status displays
- Add error handling for blockchain operations

4. Create utility functions:
- Image upload to Arweave
- Annotation storage on Arweave
- Transaction status tracking
- Data retrieval from Arweave

5. Add environment variables:
```env
NEXT_PUBLIC_ARWEAVE_HOST=arweave.net
NEXT_PUBLIC_ARWEAVE_PORT=443
NEXT_PUBLIC_ARWEAVE_PROTOCOL=https
```

## Security Considerations

1. Wallet Management
- Securely store Arweave wallet credentials
- Use proper key management practices
- Consider implementing wallet connection options

2. Data Validation
- Verify file types and sizes before upload
- Validate annotation data structure
- Implement proper error handling

3. Transaction Monitoring
- Track transaction status
- Implement retry mechanisms
- Provide clear feedback to users

## Future Enhancements

1. Batch Operations
- Upload multiple images
- Batch annotation storage
- Parallel processing

2. Advanced Queries
- Search annotations by metadata
- Filter by date/user
- Advanced data indexing

3. Integration with AI Training
- Link annotations to training data
- Track data usage in models
- Implement quality metrics