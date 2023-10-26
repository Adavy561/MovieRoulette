import React, { useState } from 'react'

const ReadMore = () => {
    const [readMoreInfo, setReadMoreInfo ] = useState(null)

    const findReadMore = () => {
        fetch("http://127.0.0.1:5000/movies")
        .then((response) => response.json())
        .then((data) => {
          data.map((movie) => {
            setReadMoreInfo(data)
          })
        })
      };

  return (
    <div>
      
    </div>
  )
}

export default ReadMore
