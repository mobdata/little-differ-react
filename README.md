# little-differ-react
This is a react component built using TypeScript for the manual process of diffing and merging JSON documents.  This application allows users to easily see differences among documents as well as select the elements that should be put into the resulting revised document.   

To install the required dependencies, run `npm install`.

To build the project, run `npm run build`. This will transpile the TypeScript source into a CommonJS bundle in the `build` directory.
To run the test suite, run `npm run test`. This will compare expected appOutput with set document inputs for testing. 

You can test the project locally by opening the file `public/index.html` in your web browser.

Little Differ React displays the results of the little-differ compareTripleJson function.

Little Differ React will display three versions of the same document in a side-by-side merge panel view.  The left and right sides display new versions of a document that conflict with each other and need to be manually merged.  The middle panel displays the original ancestor to both modifications of the document.

The side-by-side merge panel view is designed to show what is different among all three versions of the document. Discrepancies between Document A and the Original document are displayed in blue, and those between Document B and the Original, are displayed in red.  

<img width="824" alt="TriplePanel" src="https://user-images.githubusercontent.com/49216173/97996243-d0a42000-1de7-11eb-8a6b-19800f465ae4.png">

Below the Merge Panel view is the Revised Document panel. 

<img width="822" alt="RevisedPanel" src="https://user-images.githubusercontent.com/49216173/97996632-4d36fe80-1de8-11eb-9849-1ccfcd8e8851.png">

The Revised Document is pre-loaded with the elements that are equal among all three documents so that the user does not need to select them.  The user will merge the documents by clicking on the desired elements to be inserted into the Revised Document.  Each element in the merge panel view is available for selection.  When the user clicks one of the elements, the selected element will immediately appear in the Revised Document. 

<img width="849" alt="LDRSelection1" src="https://user-images.githubusercontent.com/49216173/97995123-676fdd00-1de6-11eb-9e8d-2bc445fc0f2a.png">

Buttons are also provided for the user to choose not to select individual keys and accept any of the documents as the Revised Doc. 

## Usage

In a prototypical example, you will have three versions of one document in JSON format.  These are the "original" document and two conflicting versions of that document that need to be merged.  After merging the documents into a "Revised Document," the user will click on a custom text button to a callback method of your choice in order to set the Revised Document in your component.  The AppComponent from Little-Differ-React will take six props including the original document, the 'docA' version, the 'docB' version, the ID of the document, the custom button text for your component, and the callback method that will accept the revisedDocument in your component.

Please Note: Little-Differ-React expects that each document will have a _rev key indicating the revision id of each document. If you are using CouchDb, this is standard.     
````javascript
import AppComponent from '@mobdata/little-differ-react/'


function changeRevisedDataForCaller(value: object) {
  // eslint-disable-next-line prefer-template
  // Method called in the callback when the Accept Final button is clicked 
  // for you to handle the revised doc however you want.
  console.log('Revised Data retrieved by caller: ' + JSON.stringify(value));
}

ReactDOM.render(

  <AppComponent
    orig={original3}
    docA={documentA3}
    docB={documentB3}
    selectedDoc={1}
    acceptFinalButtonText="Push Current Buffer(Change this text)"
    changeRevisedDataForCaller={(doc) => changeRevisedDataForCaller(doc)}
  />,
  document.getElementById('root'),
)

````


