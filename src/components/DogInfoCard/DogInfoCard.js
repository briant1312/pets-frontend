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
                        <p><span>Temperament:</span> {dog.temperament}</p>
                        <p><span>Life span:</span> {dog.life_span}</p>
                        <p><span>Origin:</span> {dog.origin || "unknown"}</p>
                        <p><span>Bred for:</span> {dog.bred_for || "unknown"}</p>
                        {dog.weight?.imperial && <p><span>Weight:</span> {dog.weight.imperial} lbs</p>}
                        {dog.height?.imperial && <p><span>Height at shoulders:</span> {dog.height.imperial} inches</p>}
                    </div>
                </>
            }
        </div>
    )
}
