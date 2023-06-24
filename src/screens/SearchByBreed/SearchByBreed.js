import { useState } from 'react'
import DogInfoCard from '../../components/DogInfoCard/DogInfoCard'
import CatInfoCard from '../../components/CatInfoCard/CatInfoCard'
const cats = require('../../data/cats.json')
const dogs = require('../../data/dogs.json')

export default function SearchByBreed(){
    const [species, setSpecies] = useState("dog")

    const handleSpeciesSelect = (e) => {
        setSpecies(e.target.value)
    }

    const [breed, setBreed] = useState("")

    const handleBreedSelect = (e) => {
        setBreed(e.target.value)
    }

    return (
    <>
        <form>
            <select value={species} onChange={handleSpeciesSelect}>
                <option key="cat">cat</option>
                <option key="dog">dog</option>
            </select>
            
            {species === "cat" && <select value={breed} onChange={handleBreedSelect}>
                {cats.map((cat) => (
                    <option key={cat.id}>{cat.name}</option>
                ))}
            </select>}
            {species === "dog" && <select value={breed} onChange={handleBreedSelect}>
                {dogs.map((dog) => (
                    <option key={dog.id}>{dog.name}</option>
                ))}
            </select>}
        </form>

            {species === "dog" && <DogInfoCard dog={dogs.find((dog) => dog.name === breed)}/>}
            {species === "cat" &&<CatInfoCard cat={cats.find((cat) => cat.name === breed)}/>}
        
    </>
)}
