const express = require('express')
const router = express.Router()

const Page = require('../models/page')

router.get('/', async (req, res) => {
  try{
    const pages = await Page.find()

    return res.send({pages})
  }catch (err){
    return res.status(400).send({error: 'Error loading pages'})
  }
})

router.get('/:pageId', async (req, res) => {
  // return res.send('OK-GET-PAGE') 
  let pageId = req.params.pageId
  try{
    const page = await Page.findOne({pageId})

    return res.send({page})
  }catch (err){
    console.log(err)
    return res.status(400).send({error: 'Error loading Page'})
  }  
})

router.post('/', async (req, res) => {
  try{  
    let pageId = req.body.pageId
    const searchPage = await Page.findOne({pageId})
    if(searchPage){
      const page = await Page.findOneAndUpdate({pageId}, req.body, {new: true})

      await page.save()
  
      return res.send({page})
    }else{
      const page = await Page.create(req.body)    

      await page.save()
  
      return res.send({page})
    }    
  }catch (err){
    console.log(err)
    return res.status(400).send({error: 'Error creating new page'})
  }  
})

router.put('/:pageId', async (req, res) => {
  try{    
    const pageId = req.params.pageId
    const page = await Page.findOneAndUpdate({pageId}, req.body, {new: true}) //{new: true} retorna o projeto atualizado não a ultima versão 

    await page.save()

    return res.send({page})
  }catch (err){
    console.log(err)
    return res.status(400).send({error: 'Error updating page'})
  } 
})

router.delete('/:pageId', async (req, res) => {
  let pageId = req.params.pageId
  try{
    await Page.findOneAndDelete({pageId})

    return res.send({deletePage:'true'})
  }catch (err){
    console.log(err)
    return res.status(400).send({error: 'Error loading Page'})
  }  
})

module.exports = app => app.use('/pages', router)