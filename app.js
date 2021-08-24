let picture;
let quote;
let giveAdvice;
let myMembers;
let button;


let box1;
let box2;
let box3;
let box4;
let box5;

const findParty = (party) => {

    switch (party) {
        case "NDP":
            return box1;
        break;
        case "Liberal":
            return box2;
        break;
        case "Conservative":
            return box3;
        break;
        case "Green Party":
            return box4;
         break;
        case "Bloc Qu\u00e9b\u00e9cois":
            return box5;
         break;
    
        default:
            console.log("we have a problem");
            console.log("party :" + party);
            break;
    }

};

const generateMember = (name, party, pictureSRC, index) => {
   member = document.createElement("p");
   member.innerHTML = name;
   member.className = 'member';

   member.addEventListener('click', (e) => {

    if (myMembers[index].quote) {
        giveAdvice.disabled = true;
    } else {
        giveAdvice.disabled = false;
    }

    picture.src = pictureSRC;
    quote.textContent = myMembers[index].quote;

        giveAdvice.onclick = ('click', (e) => {
             
                fetch('	https://api.adviceslip.com/advice')
                .then((e) => e.json())
                .then((newQuote) => {
                     
                    myMembers[index].quote = newQuote.slip.advice;
                    console.log(index);
                    quote.textContent = myMembers[index].quote;
                    
                })
                .catch((err) => console.log(err));  
            
                  
            giveAdvice.disabled = true;
        
        })
        

   })


    findParty(party).append(member);

}


document.addEventListener("DOMContentLoaded", () => {

picture = document.querySelector('.img');
quote = document.querySelector('.quote');
giveAdvice = document.querySelector('.give-advice');

box1 = document.getElementById("1");
box2 = document.getElementById("2");
box3 = document.getElementById("3");
box4 = document.getElementById("4");
box5 = document.getElementById("5");

// populate the bottom fields
fetch('https://represent.opennorth.ca/representatives/house-of-commons/?offset=0&limit=200')
.then((e) => e.json())
// i create a new array which i can munipulate to save the quote data
.then(data =>  {
myMembers = data.objects.map((e, i) => {
return {
    id: i,
    name: e.name,
    party: e.party_name,
    pictureSrc: e.photo_url,
    quote: ""
}
})
myMembers.forEach(member => {
     generateMember(member.name, member.party, member.pictureSrc, member.id);
});
}
)
.catch((err) => console.log(err));






});