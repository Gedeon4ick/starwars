import React from 'react';
import styles from './Character.module.scss'
import StarWarsServices from '@/services/StarWars';
import { useState, useEffect } from 'react';
import  ImageLoader  from '../ImageLoader/ImageLoader';

const Character = ({characters}) => {
  const [peoples, setPeople]= useState(characters);
  const [count, setCount] = useState(2);
  const [loading, setLoading] = useState(false)
  const [currentCharcter, setCurrentCharucter] = useState({})
  const [deleteBtn, setSeleteBtn] = useState(true)
  const [planetName, setPlanetName] = useState('')

  const s = new StarWarsServices()

  const moreList = () => {
    setLoading(true)
    s.getAllCharacters(count).then(res => {
      if(res.length < 10) {
        setSeleteBtn(false)
      }
      setPeople([...peoples, ...res])
      setCount(count + 1)
      setLoading(false)
    })
  }

  const getCharacter = (id) => {
    const res = peoples.filter((el) => {
      if (el.id == id) {
        return el
      }
    })
    setCurrentCharucter(res[0])  
  };


  const getHomeworld = async (id) => {
    const homeworld = await s.getPlanet(id)
    setPlanetName(homeworld.name)
  }
  
  useEffect(() => {
    if (currentCharcter.homeworld) {
      getHomeworld(currentCharcter.homeworld)
    }
  }, [currentCharcter])

  return (
      <div className={styles.character}>
        <div className={styles.title}>Characters</div>
        <div className={styles.wrapper}>
          <ul>
              {peoples.map(character => (
                <li value={character.id} onClick={(event) => getCharacter(event.target.value)} key={character.id}>{character.name}</li>
              ))}
              {loading && <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" />}
              {deleteBtn && <button onClick={() => moreList()}>More characters</button> }
          </ul>
        <div className="information">
          {currentCharcter.name ? (
            <>
              <ImageLoader src={currentCharcter.imgAddress} />
              <div className="name">name: {currentCharcter.name}</div>
              <div className="gender">gender: {currentCharcter.gender}</div>
              {planetName ? (
                <div className="homeworld">
                  homeworld: {planetName}
                </div>
              ) : null}
              <div className="height">height: {currentCharcter.height}</div>
              <div className="mass">mass: {currentCharcter.mass}</div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Character;

