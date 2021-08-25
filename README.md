
![SWE at Multiverse Welcome](https://user-images.githubusercontent.com/4499581/111465340-e3295100-8719-11eb-8c34-40c60ced07e7.png)

## Overview

This is a repository of apprentice facing lessons and coach notes. Published on Github pages [https://multiverselearningproducts.github.io/curriculum](https://multiverselearningproducts.github.io/curriculum).

## Additional Resources

Additional curriculum resources (e.g. slides) can be found in the following [Google drive](https://drive.google.com/drive/folders/1N9TI7awO4Hu_lvo60k8GOa8MeJ6fPCQU)

## Usage

Clone the repo. Make sure you have push permissions to this repo. To publish your changes run;

```
npm run publish
```

That will build the markdown pages into html pages and then push to github. See the site here [https://multiverselearningproducts.github.io/curriculum](https://multiverselearningproducts.github.io/curriculum)

## Optional Lessons

Optional lessons are marked with an asterisk *

## Images

Add images for the curriculum [here](https://github.com/MultiverseLearningProducts/curriculum/issues/1), keep them out of the codebase so they are not sent back and forth as we push and pull the repo.

1. Drag your image into a new issue
2. Wait for the image to upload then right click to copy the image URL
3. Add your image using markdown `![alt label in here](image URL in here)`
4. OPTIONAL add a figcaption for the image using `![alt label in here](image URL in here "fig caption here")`

## Special Markdowns

### Embeds

You can embed Google slides and YouTube videos using `!(embed-url)`. With Google Slides make sure your slide link ends with `/embed`. You might have to doctor the URL to ensure this. i.e.

```sh
!(https://docs.google.com/presentation/d/e/2PACX-1vR9fXGQK-iEBE2zaLeilLJlAM0_90xheU8S1VTGyvT08hmVuKDK-sPlL34MeXf3bv-Pl8zBw9caaHti/embed)
```

YouTube videos you just need the shareable link.

### Tabbed code blocks

![a tabbed code block](https://user-images.githubusercontent.com/4499581/130763774-455eaa39-c207-445f-bc88-f4b3c986b5b4.png)

To create a tabbed code block use the following markdown

![use the pipe character to separate the labels for the language tabs no line-breaks between the following code blocks](https://user-images.githubusercontent.com/4499581/130763778-58661460-4762-452b-8497-3ae44559d8bc.png)

There are 3 rules to follow:

1. Use the block delimiter `|Javascript|Java|` at the beginning __and__ end of your tabbed code block
1. Create the tabs with the pipe character your text here will become the label and the hash i.e. "Javascript" -> #javascript
1. In the code blocks that follow don't create line breaks between them i.e make sure your different language blocks butt up to each other.

The language preference is set in local storage so your choice of language will persist between page loads.
