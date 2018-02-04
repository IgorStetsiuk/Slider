# Slider

### Simple pure js slider with options

#### Options object

defaults settings

```js
 {  itemsPerPage: 1,
    itemsToSlide: 1,
    bullets: false,
    arrows: true,
    infinity: false,
    transition: 'ease-out',
    duration: 1500,
    autoPlay: false
 }
 

```

__`itemsPerPage`__(number)

The number of slides to be shown.

__`itemsToSlide`__(number)

The number of slides which will be slide away

__`bullets`__(boolean)

True if you want to show bullets under slider-container otherwise false 

__`arrows`__(boolean)

Show left and right arrow or not


__`infinity`__ (number)
  
Loop the slides around

__`transition`__ (string)

Function which will be used to switching between slides

__`duration`__ (number)  

Slide transition duration in milliseconds

__`autoPlay`__ (boolean)

If this feature is enable  __arrows__ and bullets will we disabled
Set interval according to **duration** 
  
