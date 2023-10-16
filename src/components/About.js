import React from 'react';

export default function About(props){
    return(
    <div>
        <h2>App Description</h2>
        <ul>
            <li>
                <h3>Users:</h3>
                <p>Our users can be any people of any age who is an English speaker willing to learn Chinese, however we will be primarily targeting those who are just starting out to learn Mandarin. This website will help the spread and popularization of Chinese in English-dominanted countries.</p>
            </li>
            <li>
                <h3>Features:</h3>
                <ol>
                    <li>An English-Mandarin dictionary, where users can type in words in English that they want to learn and get the corresponding Chinese words and definitions.</li>
                    <li>A multiple choice quiz that will present the user with an image, to which the user must answer by choosing the matching Chinese or English word. The results of the quiz will be stored to be viewed in the graph.</li>
                    <li>A graph that will show the user their quiz results, and the trend of their scores. The user can change the graph to display their most recent scores or their entire results history, as well as show the scores of only a specific type of question (Chinese word, English word, or image).</li>
                    <li>Chinese homonymous words comparison. Chinese words are made up with different radicals and character parts, and combination of the these parts makes up various words. Thus, there are a lot of words share the same parts but with totally different meanings and pronunciations. In this section, we will help users to find out words with the same character part and compare them, allowing users to remember what each word means from their different subcomponents.</li>
                </ol>
                <p>In addition, we also plan on having an account feature, where users will log in using their email and password, which will allow them to store and access their quiz results from anywhere.</p>
            </li>
            <li>
                <h3>Information:</h3>
                <p>Users will view information from our English-Mandarin dictionary, which will be pulled from this <a href="https://www.mdbg.net/chinese/dictionary?page=cc-cedict">website</a>.</p>
            </li>
            <li>
                <h3>Problem-solving:</h3>
                <p>As pointed out above, Chinese has a high learning threshold, so the goal of our website is the lower this threshold by making our users find Chinese to be a more accessible language. Instead of teaching long sentences like other Chinese learning websites, our website's functions focus on teaching individual words to the user, which is simpler and easier to grasp for those new to learning Mandarin. In addition, unlike other existing learning platforms that rely on fixed courses, our website is much more flexible, as it allows users to learn whichever words they wish via our dictionary feature and view how they have improved over time, offering our users even more possibilities for their learning.</p>
            </li>
        </ul>
    </div>
    );
}