start : 
npm install
npm start
host :http://localhost:5000
___________________________
new
___________________________
*get one injury:
post req "http://localhost:5000/api/injuries/getone"
body :{
"injuryid":"injuryid"
}
*getpalayersbycategory:
post req "localhost:5000/api/player/getplayersbycategory"
body :{
     
      "category":"category"
}
----------
*get passwords:
get req "localhost:5000/api/player/categorypass"


---------------------------
Player
---------------------------
*add paler:

post req "http://localhost:5000/api/player/add"
body:{
      "firstname":"test" ,
      "lastname": "lastname",
      "email":"email",
      "date":"date",
      "category":"category",
      "position":" position",
      "height": "height",
      "weight":"weight",
      "number":"number",
     "Urlimage":"Urlimage"
      }
*delete Player:
post req "http://localhost:5000/api/player/delete"
{
    "deletedid":"63b2edefb3b5dc53393dc132"
}
*modify palyer:
post req "http://localhost:5000/api/player/update"
body:
{
      "firstname":"test" ,
      "lastname": "lastname",
      "email":"email",
      "date":"dat",
      "category":"category"
      "position":" position",
      "height": "height",
      "weight":"weight",
      "number":"number",
     "Urlimage":"Urlimage",
     "_id": "63b2edefb3b5dc53393dc132"
      }
*getone player:
post req "http://localhost:5000/api/player/getone"
body :
{
    "playerid":"playerid"
}

*getall players:
get req "http://localhost:5000/api/player/getall"

---------------------
quiz
---------------------
*add quiz:
post req "http://localhost:5000/api/quiz/add"
body:
{
    "Quality":1,
    "Stress": 7,
    "Fatigue":2,
    "player" : "63b2edefb3b5dc53393dc132"//not obligatoire
}
*getten firts quizs by a player:
post req "http://localhost:5000/api/quiz/getplayerten"
body:
{
    "playerid" : "63b2edefb3b5dc53393dc132"
}
*getten firts quizs :
get req "http://localhost:5000/api/quiz/getten"

----------------------
injury:
----------------------
*add injury:
post req "http://localhost:5000/api/injuries/add"
body:
    {
    
        "datedebut": "datedebut",
        "description":"description",
        "degree":"degree",
        "name":"name",
      "player": "playerid",
      "urlimage":"urlimage",
      "comment":"comment"//not obligatoire
}
*get all injuries:
Get req "http://localhost:5000/api/injuries/getall"

*get injuries by playerid:
Post req "localhost:5000/api/injuries/getbypalyerid"
body:{

    "playerid" : "Playerid"

}

*delete injury:
post req "localhost:5000/api/injuries/delete"
body:
{
    "deletedid" :"injuryid"
}

----------------------------------
PDF:
____________________________

*add pdf:
post req "localhost:5000/api/pdfs/add"
body :{
    'testimage:file
}
*get all pdfs:
get req "localhost:5000/api/pdfs/getall"

*delete pdf:
post req "localhost:5000/api/pdfs/delete"
body : {
    "deletedid" : "pdfid"
}
