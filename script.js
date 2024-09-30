// Express Hospital-Kidney App

const express = require('express');
const app = express();

const hospital=[{
    name:"Appoloo Hospital",
    kidney:[{
        health:true
    },
    {
        health:false
    }
]
}];

app.use(express.json());

//  Get - : - User can check how many kidneys hospital has and their health 
app.get("/",function(req,res){
    const TotalKidney=hospital[0].kidney.length;
    let HealthyKidney = 0;
    for(let i=0;i<TotalKidney;i++){
        if(hospital[0].kidney[i].health === true){
            HealthyKidney++;
        }
        
    }

    const UnhealthyKidney= TotalKidney-HealthyKidney;
    const hospitalname=hospital[0].name;
    res.json({
        hospitalname,
        TotalKidney,
        HealthyKidney,
        UnhealthyKidney
    });
});

// POST - Going to get a new kidney inserted in the hospital 
app.post("/",function(req,res){
    const ishealthy=req.body.ishealthy;

    hospital[0].kidney.push({
        health:ishealthy
    })

    res.json({
        msg:`Done ${ishealthy} `
    })
});

// PUT - Replace all unhealthy kidney with  healthy one's

app.put("/",function(req,res){
    for(let i =0;i<hospital[0].kidney.length;i++){
        if(hospital[0].kidney[i].health==false){
            hospital[0].kidney[i].health=true
        }
    }
    res.json({
        msg:"Successfully replaced"
    })
});

// DELETE - Going to get a kidney removed
app.delete("/",function(req,res){
    for(let i =hospital[0].kidney.length-1;i>=0;i--){
        if(hospital[0].kidney[i].health==false){
            hospital[0].kidney.splice(i,1);
        }
    }
    res.json({
        msg:"Sare false wale delete ho gae hai"
    })
})

app.listen(3000,()=>{
    console.log("Serving on port 3000");
});