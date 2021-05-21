import { GridList, GridListTile, GridListTileBar } from '@material-ui/core'
import React from 'react'

/**
 * Gallery component
 * Handles sorting and returning images
 * @author Simon Nilsson, simnil-8
*/

const Gallery = ({data, setSelectedImg, pageAmount }) => {

    // Return this if filter search failed
    if(data.images === undefined){
        return (
            <div>
                <h1 className="search-fail">Inga bilder hittades!</h1>
            </div>
        )
    }
    console.log('Page amount: ' + pageAmount.start, pageAmount.end);

    return (
        <div>
            <GridList cellHeight={300} cols={3}> 
                {data.images.slice(pageAmount.start, pageAmount.end).map((img) => (
                   <GridListTile className="img-wrap" key={img.ID_image} onClick={() => setSelectedImg(img)}>
                       <img src={img.imageURL}  alt={img.photographer}/>
                       <GridListTileBar title={img.photographer} subtitle={img.location}/>
                   </GridListTile> 
                ))}
            </GridList>
           
        </div>
    )
}

export default Gallery

