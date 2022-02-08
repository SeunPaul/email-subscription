const express = require("express");
const mailchimp = require("../config/mailchimp")

const router = express.Router();


router.post('/addMember', async (req, res)=>{
  const {firstname, lastname, email} = req.body
  const list_id = "69d2ed98be"

  try {
    const response = await mailchimp.lists.addListMember(list_id, 
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname
        },
      },
      {
        skipMergeValidation: false
      }
    );
    if(response.id){
      res.status(200).json("success")
    }else{
      res.status(400).json("fail")
    }
  } catch (error) {
    if(!error.response){
      res.status(400).json("network error")
    }else if(error.response.body.title === 'Member Exists'){
      res.status(200).json("exists")
    }else{
      res.status(400).json("fail")
    }
    
  }  
});

router.get('/getInfo', async (req, res)=>{

    const list_id = "69d2ed98be"
    //   const response = await mailchimp.ping.get();
    //   console.log(response);
    
    //   const response = await mailchimp.lists.getAllLists();
    //   console.log(response);
    
    // const response = await mailchimp.lists.getList("69d2ed98be");
    // console.log(response);

    const response = await mailchimp.lists.getListMembersInfo(list_id);
    console.log(response);
});

router.put('/updateMember', async (req, res)=>{
  const list_id = "69d2ed98be"
  const member_id = "5c23888edb44a553b1a581a268864e4f"
  const response = await mailchimp.lists.setListMember(
    list_id,
    member_id,
    { status: "subscribed" }
  );
  console.log(response);
});


module.exports = router;