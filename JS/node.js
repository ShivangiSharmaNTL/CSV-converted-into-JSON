const readline = require('readline')             //reading of a stream (such as STDIN) one line at a time
  const fs = require('fs')                         //including the File System module
  const rl = readline.createInterface({
   input: fs.createReadStream('../CSV/India2011.csv','utf-8')  //input csv file to be read line by line
 })
  let c =0,c1 = 0;
  let ILM =0,ILF =0,IIM =0,IIF =0,TM =0,TF =0,SWLM =0,SWLF =0,SWIM =0,SWIF = 0;
  let state =[],LP =[],IP =[],values =[],values1 =[],values2 =[],values3 =[],values4 = [];          //creating empty array for 3rd json
  let IndiaLiteracy =[],SevenStateLiteracy =[],statewiseLiteracy = [];  //empty array for 1,2 and 3rd json
  rl.on('line', (line) => {                        //reading data line by line
    c++;
    if(c!=1) {                                 //heading(first) line is ignored present in csv file
      line.split('\n')                            
      let arr = line.split(',');                   //spliting line and creating array on basis of ,(comma)
      if(arr[4]=="Total" && arr[5]=="All ages") {  //matching condition for execution
        ILM+= parseInt(arr[13]);             //pushing and adding literate male in ILM
        ILF+=parseInt(arr[14]);              //pushing and adding literate female in ILF
        IIM+=parseInt(arr[10]);             //pushing and adding illiterate male in IIM
        IIF+=parseInt(arr[11]);             //pushing and adding illiterate female in IIF
        TM+=parseInt(arr[7]);              //pushing and adding male in TM
        TF+=parseInt(arr[8]);              //pushing and adding female in TF
        state.push(arr[3]);                        //pushing state Name in state array
        LP.push(parseInt(arr[12]));            //pushing literate person in LP array
        IP.push(parseInt(arr[9]));            //pushing illiterate person in IP array
        if(arr[1]==12 || arr[1]==13 || arr[1]==14 || arr[1]==15 || arr[1]==16 || arr[1]==17 || arr[1]==18) {  //matching statecode
          SWLM+=parseInt(arr[13]);            //pushing and adding literate male in SWLM statewise
          SWLF+=parseInt(arr[14]);            //pushing and adding literate female in SWLF statewise
          SWIM+=parseInt(arr[10]);           //pushing and adding illiterate male in SWIM statewise
          SWIF+=parseInt(arr[11]);           //pushing and adding illiterate female in SWIF statewise
        }
      }
    }
  })
  .on('close', () => {  
    values.push({
      "value": ILM,
      "rate" : "Male"
    },
    {
      "value": ILF,
      "rate" : "Female"
      })                          //execute after reading csv file line by line 
    IndiaLiteracy.push({   
      "category" : "Literate",
      "values": values.map((i)=>i)
    })
    values1.push({
      "value": IIM,
      "rate" : "Male"
    },
    {
      "value": IIF,
      "rate" : "Female"
    }) 
    IndiaLiteracy.push({   
      "category" : "Illiterate",
      "values": values1.map((i)=>i)
    })
    values2.push({
      "value": SWLM,
      "rate" : "Male"
    },
    {
      "value": SWLF,
      "rate" : "Female"
      })                          //execute after reading csv file line by line 
    SevenStateLiteracy.push({   
      "category" : "Literate",
      "values": values2.map((i)=>i)
    })
    values3.push({
      "value": SWIM,
      "rate" : "Male"
    },
    {
      "value": SWIF,
      "rate" : "Female"
    }) 
    SevenStateLiteracy.push({   
      "category" : "Illiterate",
      "values": values3.map((i)=>i)
    })
    values.push({
      "value": ILM,
      "rate" : "Male"
    },
    {
      "value": ILF,
      "rate" : "Female"
      })                          //execute after reading csv file line by line 
    IndiaLiteracy.push({   
      "category" : "Literate",
      "values": values.map((i)=>i)
    })
    values4.push({
      "value": LP[c1],
      "rate" : "Literate Person"
    },
    {
      "value": IP[c1],
      "rate" : "Illiterate Person"
      })                          //execute after reading csv file line by line 
    IndiaLiteracy.push({   
      "category" : "Literate",
      "values": values.map((i)=>i)
    })
   state.map((l) => {                             //high-order function map is used for creating 3rd JSON
      statewiseLiteracy.push({                     //pushing data one by one into array creating 3rd JSON
       "StateName": l,
       "LiteratePersons" : LP[c1],
       "IlliteratePersons" : IP[c1]
     })
      c1++;
    })
    fs.createWriteStream('../JSON/IndiaLiteracy.json').write(JSON.stringify(IndiaLiteracy,null,2));   //writing in 1st JSON as output
    fs.createWriteStream('../JSON/SevenStateLiteracy.json').write(JSON.stringify(SevenStateLiteracy,null,2));  //writing in 2nd JSON as output
    fs.createWriteStream('../JSON/statewiseLiteracy.json').write(JSON.stringify(statewiseLiteracy,null,2));    //writing in 3rd JSON as output
  });
