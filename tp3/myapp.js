const express=require('express')
const app=express();


// Middleware de logging
const loggerMiddleware = (req, res, next) => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    console.log(`[${date} ${time}] ${req.method} ${req.path}`);
    
    // Appeler next() pour passer au middleware suivant
    next();
};

//Utiliser le middleware dans l'application
app.use(loggerMiddleware);

// exemple de route pour tester le middelware
app.get("/",(req,res)=>{
    res.send('TP3!');
}) ; 
//
app.get("/tp3",(req,res)=>{
    res.send('Une deuxieme API');
});

app.get("/tp3/log",(req,res)=>{
    res.send('Une troixieme API');
});

app.listen(3000,()=>{
    console.log('Serveur demarre sue le port 3000');
});


