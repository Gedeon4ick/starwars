class StarWarsServices {
  _apiBase = "https://swapi.dev/api/";

  async getResources(url) {
    try {
      const response = await fetch(`${this._apiBase}${url}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = response.json()
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async getPlanet(id) {
    const result = await this.getResources(`/planets/${id}`)
    return result
  }

  async getCharacter(id) {
    const result = await this.getResources(`/people/${id}`)
    return result
  }

  async getAllCharacters(page=1) {
    const result = await this.getResources(`/people/?page=${page}`)
    return result.results.map(this._transformCharacter)
  }

  _extractId = (url) => {
    const match = url.match(/\/(\d+)\/$/);
    return match ? match[1] : null;
  }

  _transformCharacter =  (dataObject) => {
    const id = this._extractId(dataObject.url)
    const idHoomeworld = this._extractId(dataObject.homeworld)
    return {
      id,
      name: dataObject.name,
      gender: dataObject.gender,
      homeworld: idHoomeworld,
      height: dataObject.height,
      mass: dataObject.mass,
      imgAddress: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
  }
  }
}

export default StarWarsServices
