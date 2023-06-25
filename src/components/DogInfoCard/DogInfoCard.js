import './DogInfoCard.scss'
import { useParams } from 'react-router-dom'
const dogs = require('../../data/dogs.json')

export default function DogInfoCard(){
    const { dogId } = useParams()
    const dog = dogs.find((dog) => dog.name === dogId)
    return (
        <div className='dog-info-card'>
            {dog && 
                <>
                    <h1>{dog.name}</h1>

                    <div className='right-side'>
                        {dog.image?.url && <img src={dog.image.url} alt="dog"/>}
                        <p>temperament: {dog.temperament}</p>
                        <p>life span: {dog.life_span}</p>
                        <p>origin: {dog.origin || "unknown"}</p>
                        <p>bred for: {dog.bred_for || "unknown"}</p>
                        {dog.weight?.imperial && <p>weight: {dog.weight.imperial} pounds</p>}
                        {dog.height?.imperial && <p>height at shoulders: {dog.height.imperial} inches</p>}
                    </div>
                </>
            }
        </div>
    )
}
