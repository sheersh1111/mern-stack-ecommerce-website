class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }
    search(){
        const keyword=this.queryStr.keyword
        ?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i",

            },
        }
    :{};
    console.log(keyword);
    if(keyword==={}){
        return this;
    }else{
        this.query=this.query.find({...keyword});
    }
    return this;

    
    }
    filter(){
        const queryCopy={...this.queryStr};
        // Removing some fields for category
        const removeFields=["keyword","page","limit"];
        removeFields.forEach((key)=>delete queryCopy[key]);
        let queryStr= JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(resultPerPage){
        const currentPage= Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage-1);
        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}
module.exports=ApiFeatures;


// console.log(req.query.keyword)
    


   







// const filter=(queryStr)=>{
//     const queryCopy={...this.queryStr};
//     // Removing some fields for category
//     const removeFields=["keyword","page","limit"];
//     removeFields.forEach((key)=>delete queryCopy[key]);
//     queryStr= JSON.stringify(queryCopy);
//     queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
    
//      return JSON.parse(queryStr);
// }


// let products=[];
// let products1=[];
// let a =JSON.stringify("dh")
// a=a.replace(key=>`${key}`);
// a=JSON.parse(a)
// console.log(a)

// const keyword=req.query.keyword?{
//    name:{
//        $regex:req.query.keyword,
//        $options:"i",
//    }
// }:{};
// console.log(req.query.pricegte,req.query.category);
// console.log(keyword);
// products1=await Product.find({...keyword}); 

// if(products1.length>=1){
// products=products1
// }

//  products1=[];
// for(i=0;i<products.length;i++){
// console.log("madao")
// console.log(products[i].price)
// if(products[i].price>=2000 && products[i].price<=25000 && products[i].ratings>=0){
   
//    if(products[i].category!==""){
//        if(products[i].category==req.query.category){
//            products1.push(products[i]);
//        }else{continue}
//    }else{
//        products1.push(products[i]);
//    }

// }else{continue}

// }

// products=products1

// console.log(products1);