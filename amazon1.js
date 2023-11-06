import axios from "axios";
//import cheerio from "cheerio";
import * as cheerio from 'cheerio';
import { MongoClient } from "mongodb";
import express from "express";
//import { data } from "cheerio/lib/api/attributes";
//import { CronJob } from "cron";

export async function getGenre(req, res){
try {
    // Make an HTTP GET request to the target website
    
    // const response = await axios.get('https://www.flipkart.com/');
    //const response = await axios.get('https://www.flipkart.com/search?q=laptop&sid=6bo%2Cb5g&as=on&as-show=on&otracker=AS_QueryStore_OrganicAutoSuggest_1_5_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_5_na_na_na&as-pos=1&as-type=HISTORY&suggestionId=laptop%7CLaptops&requestId=8a984166-8ffa-45fd-981e-ad6c50c67e3d');
    //const response = await axios.get('https://www.amazon.in/s?k=amazon+basics+tv&crid=X06PU3YGGMX9&sprefix=amazon+ba%2Caps%2C389&ref=nb_sb_ss_ts-doa-p_6_9');

//console.log("response",response.data) //HTML file
const product = req.query.q;
//console.log(product)

//
const response = await (
    await axios.get(`https://www.amazon.in/s?k=${product}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 5.1; AFTS Build/LMY47O) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/41.99900.2250.0242 Safari/537.36",
      },
    })
  )

    const $ = cheerio.load(response.data);  

    //connect
    let titleObj = $(
        "h2 a.a-link-normal.a-text-normal",
        'div[data-component-type="s-search-result"]'
      );
      // Find Price Section of the page
      let priceObj = $(
        "span.a-price:nth-of-type(1) span.a-offscreen",
        'div[data-component-type="s-search-result"]'
      );
      let data = [];
      // Get all product names and links
      for (let i = 0; i < titleObj.length; i++) {
        let productName = $(titleObj[i]).find("span")[0].children[0]["data"];
      // let productLink = "https://amazon.in" + $(title
    let productLink = "https://amazon.in" + $(titleObj[i]).attr("href");
        let price = $(priceObj[i]).text();
        let imgUrl = $(
          `img[alt=${`"${productName}"`}]`,
          'div[data-component-type="s-search-result"]'
        ).attr("src");
        data.push({
          productName: productName,
          price: price,
          imageUrl: imgUrl,
          productLink: productLink,
          category: product
        });
      }
    

      //
      const MongoURL = "mongodb+srv://ajay1997:ajay1997@cluster0.c76i2k0.mongodb.net/?retryWrites=true&w=majority"

      //async function createConnection(){
          const client = new MongoClient(MongoURL);   
          await client.connect()   
         // await getGenre();                   
          console.log(`MongoDB is connected successfully`)
         
      //}
      await client.db("scrape").collection("amazon").insertMany(data)

    // Return the scraped data
    //console.log({data})
    //return { data };
    res.status(200).json(data)
    //return client
}
catch(error){
    console.log(error);
}
}

// setTimeout(()=>{
//   getGenre();
// }, 3600000)   //1 hour

// function callEveryHour() {
//   setInterval(getGenre, 1000 * 60 * 60);   //1 hour
// }
// callEveryHour();




//


//export const client;


