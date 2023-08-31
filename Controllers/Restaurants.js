const { response } = require('express');
const RestaurantSchema=require('../Models/Restaurants');

exports.filterRestaurants=(req,res)=>{
    let {mealType,cuisine,location,lcost,hcost,page,sort}=req.body;
    page=page ? page:1;
    sort=sort? sort:1;//1 is for ascending and -1 for descending

    let Payload={};
    const itemsPerPage=2;
    
    let starIndex=itemsPerPage*page-itemsPerPage;//2*3-2-4
    let endIndex=itemsPerPage*3;//2*3-6
    
    if(mealtype){
        Payload['type.mealtype']=mealtype;
    }
    if(mealtype && cuisine){
        Payload['type.mealtype']=mealtype;
        Payload['Cuisine.cuisine']={$in:cuisine}
    }
    if(mealtype && lcost && hcost){//split function to extract lcost and hcost delimitor- 500-1000
        Payload['type.mealtype.mealtype']=mealtype;
        Payload["cost"]={$lte:hcost, $gte:lcost};
    }
    if(mealtype & cuisine && lcost && hcost){
        Payload['type.mealtype']=mealtype;
        Payload['Cuisine.cuisine']={$in:cuisine};
        Payload["cost"]={$lte:hcost, $gte:lcost};
    }
    if(mealtype && location){
        Payload['locality']=location;
        Payload['type.mealtype']=mealtype;
    }
    if(mealType && location && cuisine){
        Payload['type.mealtype']=mealtype;
        Payload['locality']=location;
        Payload['Cuisine.cuisine']={$in:cuisine};
    }

    //find()
    if(mealType && location && lcost && hcost){
        Payload['type.mealtype']=mealtype;
        Payload['locality']=location;
        Payload["cost"]={$lte:hcost, $gte:lcost};
    }

    if(mealtype && location && lcost && hcost && cuisine){
        Payload['type.mealtype']=mealtype;
        Payload['locality']=location;
        Payload['Cuisine.cuisine']={$in:cuisine};
        Payload["cost"]={$lte:hcost, $gte:lcost};
    }
}

    RestaurantSchema.find(Payload).sort({cost:sort})
        .then(response=>{
            const filteredResponse=response.slice(startIndex,endIndex);
            res.status(200).json({message:"Restaurants fetched successfully",
            restaurants:filteredResponse
            })
        })    
        .catch(err=>{
            res.status(400).json({error:err});
        })
