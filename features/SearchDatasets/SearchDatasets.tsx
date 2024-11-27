'use client'
import React, { useState } from 'react';
import { Dataset } from "@/components/Dataset/Dataset"
import { SearchInput } from "@/components/SearchInput/SearchInput"
import { TagPill } from "@/components/TagPill/TagPill"

export const SearchDatasets = ({ datasets }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  const filteredDatasets = datasets.filter(dataset =>
    dataset.tags[7].value.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedTag === null || dataset.tags[4].value === selectedTag)
  );

  function bytesToGB(bytes: number): string {
    const gigabytes = bytes / (1024 ** 3);
    return gigabytes.toString().slice(0, 6);
  }

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const uniqueTags = new Set(datasets.map(dataset => dataset.tags[4].value));

  return (
    <div className="flex flex-col gap-5 px-8">
      <SearchInput
        placeholder="Search Datasets"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        <TagPill
          isSelected={selectedTag === null}
          onClick={() => handleTagClick(null)}
        >
          All Datasets
        </TagPill>
        {Array.from(uniqueTags).map((tag) => (
          <TagPill
            key={tag}
            isActive={selectedTag === tag}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </TagPill>
        ))}
      </div>
      {filteredDatasets.map((dataset) => (
        <Dataset
          title={dataset.tags[7].value}
          authorName={dataset.tags[2].value.slice(-5)}
          authorProfileUrl={"https://example.com"}
          usability={7.5}
          numberOfFiles={1}
          weightOfFiles={`${bytesToGB(dataset.data_size)} GB`}
        />
      ))}
    </div>
  );
}
