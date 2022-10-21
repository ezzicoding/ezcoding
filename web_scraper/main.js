const fs = require('fs');
const path = require('path');

//this function download page data and insert them into scraps_data folder
//it can download multiple pages 
//downloadPageData()

fs
    //read all the files in ./scraps_data
    .readdirSync(path.join(__dirname,'scraps_data'))
    //loop through the files
    .forEach((file)=>{
        //reading file content and making an array of image tag for each file
        const scraped_data = fs.readFileSync(file,'utf-8').match(/<img(.*?)>/g);
        
        //transform the array to an array of name and src of all the images
        const json_data = scraped_data.map((item)=>{
            return {
                name:item.match(/alt="(.*?)"/)[0].slice(5,-1),
                src:item.match(/src="(.*?)"/)[0].slice(5,-1),
            }
        })

        //html data contain all the image
        const html_data = `<html><body>${scraped_data.join('\n')}</body></html>`;
        
        //generate the files
        fs.writeFileSync('images.html',html_data);
        fs.writeFileSync('images.json',JSON.stringify(json_data));

    })