import { GridList, GridListTile, GridListTileBar } from '@material-ui/core'
import React from 'react'

const Gallery = ({data, setSelectedImg }) => {

    // Return this if filter search failed
    if(data.images === undefined){
        return (
            <div>
                <h1 className="search-fail">No images found!</h1>
            </div>
        )
    }
    

    return (
        <div>
            <GridList cellHeight={300} cols={3}> 
                {data.images.map((img) => (
                   <GridListTile className="img-wrap" key={img.ID_image} onClick={() => setSelectedImg(img) }>
                       <img src={img.imageURL}  alt={img.photographer}/>
                       <GridListTileBar title={img.photographer} subtitle={img.location}/>
                   </GridListTile> 
                ))}
            </GridList>
           
        </div>
    )
}

export default Gallery

