console.log("ContentAI Pro Started");
const generateBtn = document.querySelector(".dashboard button");

if(generateBtn){

generateBtn.addEventListener("click", function(){

let output = document.querySelector(".output");

output.innerHTML = `
<h3>Generated Content:</h3>

<p>
10 Digital Marketing Tips to Grow Your Business in 2026

1. Understand your audience.
2. Create valuable content.
3. Use social media marketing.
4. Optimize for SEO.
5. Track your results.

Start building your online presence today!
</p>
`;

});

}
