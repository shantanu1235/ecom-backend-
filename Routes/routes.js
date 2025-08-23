const express = require('express');


const upload = require('../Middle/multer.middle');
const { createIncludesSection, getAllIncludesSections, updateIncludesSection } = require('../Controller/includesController');


const { createCallAction, getAllCallActions, updateCallAction } = require('../Controller/callactioncontroller');

const { about, getAbout, updateAbout } = require('../Controller/aboutcontroller');

const { createHeader, getAllHeaders, updateHeader } = require('../Controller/headercontroller');
const { createHeaderSettings, getHeaderSettings, getHeaderSettingsById, deleteHeaderSettings, updateHeaderSettings } = require('../Controller/headersettingcontroller');
const { createGallerySection, getAllGallerySections, updateGallerySection } = require('../Controller/gallerycontroller');
const { createHeroSection, getAllHeroSections, updateHeroSection } = require('../Controller/herocontroller');
const { createOrUpdateCategorySection, getAllCategorySections, updateCategorySection } = require('../Controller/catagoerycontroller');
const { createServicesSection, getAllServicesSections, updateServicesSection } = require('../Controller/servicecontroller');
const { createCountingSection, getAllCountingSections, updateCountingSection } = require('../Controller/countingcontroller');
const { getAllTestimonialsSections, createTestimonialsSection, updateTestimonialsSection } = require('../Controller/testimonialscontroller');
const { createSingleSlider, getAllSingleSliders, updateSingleSlider } = require('../Controller/slidercontroller');
const { getAllBlogSections, createBlogSection, updateBlogSection } = require('../Controller/blogcontroller');
const {signup,login,logout,getProfile}=require('../Controller/usercontrollers')
const { createFooter, getAllFooters, updateFooter } = require('../Controller/footercontroller');
const { isLoggedIn } = require('../Middle/Auth');
const {createGetInTouch,getAllGetInTouch, updateGetInTouch}=require('../Controller/formdatacontroller')

const routes=express.Router();

routes.post('/header',createHeader);
routes.get('/header', getAllHeaders);
routes.put('/header/:id',updateHeader)
routes.post('/hero',upload.single('heroImg'),createHeroSection)
routes.get('/hero',getAllHeroSections)
routes.put('/hero/:id',updateHeroSection)

routes.post(
      '/includes',
  upload.fields([
  { name: 'icon0', maxCount: 1 },
  { name: 'icon1' , maxCount: 1},
  { name: 'icon2' , maxCount: 1},
  { name: 'bgImage' , maxCount: 1}
]),
   createIncludesSection
 );
 routes.get('/includes',getAllIncludesSections)
 routes.put('/include/:id',updateIncludesSection)
 routes.post('/get_in_touch',createGetInTouch)
 routes.get('/get_in_touch',getAllGetInTouch)
 routes.put('/get_in_touch/:id',updateGetInTouch)
routes.post('/header1',upload.single("logoFile"), createHeaderSettings);
routes.get('/header1', getHeaderSettings);
routes.put('/header1/:id',updateHeaderSettings)
routes.delete('/header1/:id',deleteHeaderSettings)
 routes.get('/test', getAllTestimonialsSections);

routes.post(
    '/test',
    upload.fields([
        { name: 'image0', maxCount: 1 },
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 }
    ]),
    createTestimonialsSection
);
routes.put('/test/:id',updateTestimonialsSection)
routes.post('/blog',  upload.fields([
    { name: 'image0', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    // ...add as many as needed for your cards
  ]),createBlogSection);
routes.get('/blog', getAllBlogSections);
routes.put('/blog/:id',updateBlogSection)
routes.post('/slider',  upload.fields([
    { name: 'prevIcon', maxCount: 1 },
    { name: 'nextIcon', maxCount: 1 },
    { name: 'bgImage',  maxCount: 10 }
  ]),createSingleSlider)
routes.get('/slider',getAllSingleSliders)
routes.put('/slider/:id',updateSingleSlider)


// GET route to fetch data.
routes.post('/cout', upload.fields([
  { name: 'categoryImg0', maxCount: 1 },
  { name: 'categoryImg1', maxCount: 1 },
  { name: 'categoryImg2', maxCount: 1 },
  { name: 'categoryImg3', maxCount: 1 },
  { name: 'categoryImg4', maxCount: 1 },
  // ...jitne cards ho sakte hain utne yahan likh dein
]),createOrUpdateCategorySection)
routes.get('/cout',getAllCategorySections)
routes.put('/cout/:id',updateCategorySection)
routes.post('/about',upload.single("image"),about)
routes.get('/about',getAbout)
routes.put('/about/:id',updateAbout)

routes.post('/gallery',upload.fields([
  { name: 'image1' }, { name: 'image2' }, { name: 'image3' }, { name: 'image4' }, { name: 'image5' }]),createGallerySection)
routes.get('/gallery',getAllGallerySections)
routes.put('/gallery/:id',updateGallerySection)


routes.post('/call_action',upload.single("emailIcon"), createCallAction);
routes.get('/call_action',getAllCallActions);
routes.put('/call_action/:id',updateCallAction)
routes.post('/service',upload.fields([
    { name: 'mainImage0' }, { name: 'mainImage1' }, { name: 'mainImage2' }, // ...as many as cards
  ]),createServicesSection)

  routes.get('/service',getAllServicesSections)
  routes.put('/service/:id',updateServicesSection)

  routes.post('/count',upload.single('bgImage'),createCountingSection)
  routes.get('/count',getAllCountingSections)
  routes.put('/count/:id',updateCountingSection)

  routes.post('/footer',upload.single('logo'),createFooter)
  routes.get('/footer',getAllFooters)
  routes.put('/footer/:id',updateFooter)

routes.post('/register',signup)
routes.post('/login',login)
routes.get('/logout',logout)
routes.get('/me',isLoggedIn,getProfile)
module.exports = routes;