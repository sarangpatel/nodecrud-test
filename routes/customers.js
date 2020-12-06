
/*
 * GET users listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM customer',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );

              if(req.headers.authorization){
                  res.json({customers:rows}); 

              }else{
                res.render('customers',{page_title:"Customers - Node.js",data:rows});
              }
     
                
           
         });
         
         //console.log(query.sql);
    });
  
};

exports.add = function(req, res){
  res.render('add_customer',{page_title:"Add Customers - Node.js"});
};

exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM customer WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_customer',{page_title:"Edit Customers - Node.js",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

exports.report = function(req, res){

  var customer_id = req.query.id;
  var from_date = req.query.from_date;
  var to_date = req.query.to_date;
  var fitness_type = req.query.fitness_type;

  req.getConnection(function(err,connection){
       
        var query = connection.query(`select IFNULL(sum(unit),0) as total, IFNULL(avg(unit),0) as average from customer_fitness where customer_id = ${customer_id} and fitness_type = '${fitness_type}' and DATE(date_time) between '${from_date}' and '${to_date}'
`,function(err,rows)
        {
            
            if(err)
              console.log("Error Selecting : %s ",err );

                res.json(rows[0]); 
                //res.render('customers',{page_title:"Customers - Node.js",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};


/*Save the customer*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            last_name : input.last_name,
            age  : input.age
        };
        
        var query = connection.query("INSERT INTO customer set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         

            if(req.headers.authorization){
                  res.json({msg:"Customer added successfully."}); 
              }else{
                res.redirect('/customers');
              }
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    console.log(id)
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            last_name : input.last_name,
            age   : input.age        
        };
        console.log(data);
        connection.query("UPDATE customer set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         

            if(req.headers.authorization){
                  res.json({msg:"Customer updated successfully."}); 
              }else{
                res.redirect('/customers');
              }


          
        });
    
    });
};


exports.delete_customer = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM customer  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/customers');
             
        });
        
     });
};


