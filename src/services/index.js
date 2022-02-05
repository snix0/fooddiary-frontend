import config from '../config'
import rest from '../util/rest' 

async function searchEntities( entity ) {
  //return await rest.get( `${config.services.host}/${entity}` )
  return await rest.get( `http://172.17.0.1:3000/${entity}` )
}

async function getById( entity, id ) {
  return await rest.get( `http://172.17.0.1:3000/${entity}/${id}` )
}

async function getEntryById( entity, id ) {
  return await rest.get( `http://172.17.0.1:3000/entries/${id}` )
}

async function getAllEntries( ) {
  return await rest.get( `http://172.17.0.1:3000/` )
}

async function createEntity( entity, obj ) {
  return await rest.post( `${config.services.host}/${entity}`, obj )
}

export default {
  searchEntities,
  getById,
  createEntity,
  getAllEntries,
  getEntryById
}
