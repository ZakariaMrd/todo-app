const person ={
    name :"Zakaria",
    address:{
        line1:'Abdelah Senhaji Street',
        city:'Casablanca',
        country:'MAR',
    },
    profiles : ['twitter','instagram','Facebook','TikTok'],
    printProfile:() => {
        person.profiles.map(
            profiles => console.log(profiles)
        )
    }
}

export default function LearningJavaScript(){
    return(
       <>
       <div>{person.name}</div>
       <div>{person.address.line1}</div>
       <div>{person.address.city}</div>
       <div>{person.address.country}</div>
       <div>{person.profiles[0]}</div>
       <div>{person.printProfile()}</div>
       </>
    )
}