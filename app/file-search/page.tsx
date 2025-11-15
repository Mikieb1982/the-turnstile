'use client'

import { useState } from 'react'

export default function FileSearch() {
  const [query, setQuery] = useState('')
  const [files, setFiles] = useState([])
  const [result, setResult] = useState('')

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('query', query)
    files.forEach(file => {
        formData.append('files', file)
    })
    const res = await fetch('/api/file-search', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    setResult(data)
  }

  return (
    <div>
      <h1>File Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search query"
        />
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">Search</button>
      </form>
      {result && (
        <div>
          <h2>Result</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  )
}
