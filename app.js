/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTrait(people);

            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            //alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`
    personInfo += `Last Name: ${person.lastName}\n`
    personInfo += `Gender: ${person.gender}\n`
    personInfo += `DOB: ${person.dob}\n`
    personInfo += `Height: ${person.height}\n`
    personInfo += `Weight: ${person.weight}\n`
    personInfo += `Eye Color: ${person.eyeColor}\n`
    personInfo += `Occupation: ${person.occupation}\n`
    personInfo += `Parents: ${person.Parents}\n`
    personInfo += `Current Spuse: ${person.currentSpouse}\n`






    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line ????. Happy Coding! ????





function findPersonFamily(person, people){
    let foundSpouse = people.filter(function(element){      
        if (person.currentSpouse === element.id){return true}
    })
    
    let foundParents = people.filter(function(element){
        if (person.parents.includes(element.id)){return true}
    })

    let foundSiblings = people.filter(function(element){
        if ((element.parents.includes(person.parents[0]) || element.parents.includes(person.parents[1])) && element.id !== person.id)
        {return true}
    })

    let foundChild = people.filter(function(element){
        if (element.parents.includes(person.id)){return true}
    })

    if(foundSiblings.length > 0){
        alert(`Siblings: ${foundSiblings[0].firstName + " " + foundSiblings[0].lastName}\n`)
    }else{alert('This Person has no siblings')}

    if(foundSpouse.length > 0){
        alert(`Spouse: ${foundSpouse[0].firstName + " " + foundSpouse[0].lastName}\n`) 
    }else{alert(`This person has no Spouse`)}

    if(foundParents.length > 0){
        alert(`Parent: ${foundParents[0].firstName + " " + foundParents[0].lastName}\n`)
    }else{alert(`This person has no Parents`)}  

    if(foundChild.length > 0 ){
        alert(`Child:  ${foundChild[0].firstName + " " + foundChild[0].lastName}\n`)
    }else{alert('No children found, call Maury')}

}

function findPersonDescendants(person,people) {
    let descendants = findDescendants(person , people)
    if (descendants.length === 0) {
        descendants = "This person doesn't have any descendants"
    }
    alert(descendants)
    app(people)
}
function findDescendants(person, people) {
    let descendant = getDescendants(person,people)
    let descendants = ""
    for (let i = 0; i < descendant.length; i++) {
        descendants += descendant[i].firstName + " " + descendant[i].lastName + ". "
        if (i >=0) {
            let grandChildren = findDescendants(descendant[i], people)
            descendants += grandChildren
        }
    }
    return descendants
}
function getDescendants(person,people) {
    let descendants = []
    descendants = people.filter(function(element) {
        if (element.parents.length ===0) {return false}
        else if (element.parents[0] === person.id || element.parents[1] === person.id){
            {return true}
        }
    })
    return descendants
}





function searchByTrait(people){
   
    let searchResults
    let userInput = prompt("Would you like to search by gender, DOB, height, weight, eye color, or occupation?");
   
    userInput.toLowerCase()
    switch(userInput){
        case "gender":
            searchResults = searchByGender(people)
            if (searchResults.length === 0){
                alert("There is no one that matches this search!")
            }
            else
                displayTraitPeople(searchResults)
            break
        case "DOB":
            searchResults = searchByDOB(people)
            if(searchResults.length === 0){
                alert("There is no one born on this date!")
            }
            else
                displayTraitPeople(searchResults)
            break
        case "height":
            searchResults = searchByHeight(people)
            if (searchResults.length === 0){
                alert ("There is no one this height!")
            }
            else
                displayTraitPeople(searchResults)
            break
        case "weight":
            searchResults = searchByWeight(people)
            if (searchResults.length === 0){
                alert ('There is no one that weighs that much!')
            }
            else
                displayTraitPeople(searchResults)
            break
        case "eye color":
            searchResults = searchByEyeColor(people)
            if (searchResults.length === 0){
                alert ("There is no one with that eye color!")
            }
            else
                displayTraitPeople(searchResults)
            break
        case "occupation":
            searchResults = searchByOccupation(people)
            if (searchResults.length === 0){
                alert ("There is no one with that occupation!")
            }
            else
                displayTraitPeople(searchResults)
            break
        }
}
function searchByGender(people){
    let listed = ""
    let gender = promptFor("What gender are you looking for?", chars)
    let foundPerson = people.filter(function(person){
        if (person.gender === gender){
            return true;
        }
    }
    )
        for (let i = 0; i < foundPerson.length; i++) {
        listed += (`${foundPerson[i].firstName}  ${foundPerson[i].lastName} \n`)
    }
    alert(listed)
    app(people)
}

function searchByDOB(people){
    let listed = ""
    let dob = promptFor("What Date of Birth are you looking for?(ex. 0/00/0000)", chars)
    let foundPerson = people.filter(function(person){
        if (person.dob === dob){
            return true;
        }
    }
    )
        for (let i = 0; i < foundPerson.length; i++) {
        listed += (`${foundPerson[i].firstName}  ${foundPerson[i].lastName} \n`)
    }
    alert(listed)
    app(people)
}

function searchByHeight(people){
    let listed = ""
    let height = promptFor("What Height are you looking for?(ex. 00)", chars)
    let foundPerson = people.filter(function(person){
        if (person.height === parseInt(height)){
            return true
        }
    }
    )
        for (let i = 0; i < foundPerson.length; i++) {
        listed += (`${foundPerson[i].firstName}  ${foundPerson[i].lastName} \n`)
    }
    alert(listed)
    app(people)
}

function searchByWeight(people){
    let listed = ""
    let weight = promptFor("What weight are you looking for?(ex. 205)", chars)
    let foundPerson = people.filter(function(person){
        if (person.weight === parseInt(weight)){
            return true
        }
    }
    )
        for (let i = 0; i < foundPerson.length; i++) {
        listed += (`${foundPerson[i].firstName}  ${foundPerson[i].lastName} \n`)
    }
    alert(listed)
    app(people)
}


function searchByEyeColor(people){
    let listed = ""
    let eyeColor = promptFor("What Eye Color are you looking for?(ex. Hazel)", chars)
    let foundPerson = people.filter(function(person){
        if (person.eyeColor === eyeColor){
            return true
        }
    }
    )
        for (let i = 0; i < foundPerson.length; i++) {
        listed += (`${foundPerson[i].firstName}  ${foundPerson[i].lastName} \n`)
    }
    alert(listed)
    app(people)
}

function searchByOccupation(people){
    let listed = ""
    let occupation = promptFor("What occupation are you looking for?(ex. Under water Basket Weaver)", chars)
    let foundPerson = people.filter(function(person){
        if (person.occupation === occupation){
            return true
        }
    }
    )
        for (let i = 0; i < foundPerson.length; i++) {
        listed += (`${foundPerson[i].firstName}  ${foundPerson[i].lastName} \n`)
    }
    alert(listed)
    app(people)
}
    




