import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 80;

const posts = [
    {title:"Best Color Combinations to Inspire Your Design", content: "When you think about the logos of major brands, you probably just take the colors they use as a given. Of COURSE the YouTube play button is red and white and McDonald’s arches are a happy yellow – it just makes sense. That’s because color psychology plays a monumental role in branding; colors influence our perception and make us feel a certain way, even if we don’t always realize it on a conscious level. Still, it may not seem like much thought went into the logo color combinations mentioned above – aren’t they just the logical choice for what those particular brands do? Not so fast. You can bet that a hundred cups of coffee and millions of dollars went into the original logo designs of some of these powerful brands  – with much of the focus likely having been on the color combinations. So what does this mean for your own logo? No matter how you choose to design your logo, be it with a logo creator or other tool, your logo’s personality is rooted in its colors – are you a bold seagreen-fuschia, or maybe a soft yellow-white? By learning your way around color combinations, you can create a logo design that tells your audience exactly who you are. You can check out this video to get a sense of how color psychology affects people in the real world and what it means for you when you’re ready to design your own logo"}, 
    {title:"what is the hierarchy for classification of living organisms", content: "An Overview of Hierarchy and its Classification The categorising of organisms according to their similarities and differences is referred to as the hierarchy of classification. The categorisation of organisms at the hierarchical stages facilitates the systematic study of the numerous species in a specified way. Different species can be identified more easily thanks to the hierarchy of classification categories. The process of categorising various living organisms falls under the umbrella of the biological field known as taxonomy. An organised group of organisms is referred to as a taxon. What is the Hierarchy of Plants and Animals? Over several millions of years, a huge variety of species have evolved on earth and time immemorial many attempts of classification of things have been made. The life forms that surround us range from small ants to big trees, colourless insects to brightly coloured flowers or birds. For ease in studying and identifying, the idea of biological classification was put forth but for the applicable classification, a fundamental basis of classification became a necessity. Initially, things around us were segmented into living and nonliving things and later, when the variety of living things started to grow, there came the necessity for the biological classification. The classification of living organisms based on similarities and dissimilarities is known as biological classification. Each of the biologists who classified organisms, have done it by separating them into different groups according to various criteria. It took years for researchers to decide the most basic characteristics for the process of classification."}, 
    {title:"why people are porting to bsnl", content: "announced a hike in call and internet tariffs, BSNL in Kashmir has been receiving more than 300-400 porting queries on daily basis from customers across the Valley, officials on Monday said. Public Relations Officer, BSNL Kashmir, Masood Bala told Rising Kashmir that over the past two weeks, they have received over 300-400 queries regarding porting and the company’s attractive plans. “It is encouraging to see such a positive response from the public. Our services are widely appreciated, and people are choosing us because of our affordable plans,” he said. Masood said that currently 4G service is in place in Jammu and Kashmir. Company is mulling to install 500 5G mobile towers in the Kashmir Valley. “Once the 5G service is launched, it will provide a significant boost for customers. The company is enhancing infrastructure to meet the expectations of our valued customers,” he said. Masood said BSNL has its presence everywhere in Kashmir. We did not launch any special plans to counter any private telecom operators, all plans are existing plans,” Masood said. “Those customers who are looking for BSNL today are basically floating customers. We hope that they will remain always connected with the company,” he said. Following the recent tariff increases from Jio, Airtel, and Vodafone Idea (Vi), many telecom users in India are considering switching to Bharat Sanchar Nigam Limited (BSNL), the state-owned telecom company. Major telecom operators in the country have raised prices of their recharge plans by an average of 15 percent. In response, BSNL has seized the opportunity by introducing affordable recharge plans aimed at attracting new users. Mukesh Ambani-led Reliance Jio recently announced a tariff hike, raising the prices of all its plans. Shortly afterward, Bharti Airtel and Vi also announced price increases of up to 25% for their plans. Despite the hikes, the new plans, effective from July 3, continued to offer the same benefits as their previous iterations."},
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", { posts });
});

app.get("/admin", (req, res) => {
    res.render("admin", { posts });
});

app.post("/admin", (req, res) => {
    const data = {
        title: req.body.postTitle,
        content: req.body.postContent,
    };
    posts.push(data);
    console.log(posts);
    res.redirect("/admin");
});

app.get("/post/:id", (req, res) => {
    const postId = req.params.id;
    const post = posts[postId];
    if (post) {
        res.render("post", { post });
    } else {
        res.redirect("/");
    }
});

app.post("/delete", (req, res) => {
    const postTitle = req.body.postTitle;
    const index = posts.findIndex(post => post.title === postTitle);
    if (index !== -1) {
        posts.splice(index, 1);
    }
    res.redirect("/admin");
});

app.get("/admin/edit/:title", (req, res) => {
    const postTitle = req.params.title;
    const post = posts.find(p => p.title === postTitle);
    if (post) {
        res.render("edit", { post });
    } else {
        res.redirect("/admin");
    }
});

app.post("/admin/update", (req, res) => {
    const oldTitle = req.body.oldTitle;
    const newTitle = req.body.postTitle;
    const newContent = req.body.postContent;

    const post = posts.find(p => p.title === oldTitle);
    if (post) {
        post.title = newTitle;
        post.content = newContent;
    }

    res.redirect("/admin");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
