import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsChevronRight } from "react-icons/bs";
import { AiOutlineFontSize } from "react-icons/ai";
import { IoMdColorPalette } from "react-icons/io";
import { CgDarkMode } from "react-icons/cg";
import { useParams, Route } from "react-router-dom";

const Chapter = () => {
  const { id } = useParams();
  const [book, setBook] = useState("Eleceed");
  const [chapter, setChapter] = useState("Resurrection");
  const [chapterInput, setChapterInput] = useState("1");
  const [chapterSelectionPopupVis, setChapterSelectionPopupVis] =
    useState(false);
  const [fontPopupVis, setFontPopupVis] = useState(false);
  const [fontSizeVal, setFontSizeVal] = useState(2);
  const [fontSize, setFontSize] = useState("largeFont");
  const [letterSpacingVal, setLetterSpacingVal] = useState(0);
  const [letterSpacing, setLetterSpacing] = useState("smallSpace");
  const [myComment, setMyComment] = useState("");
  const [darkMode, setDarkMode] = useState(0);
  const chapterText =
    "Sitting in the sun, away from everyone who had done him harm in the past, he quietly listened to those who roamed by. He felt at peace in the moment, hoping it would last, but knowing the reprieve would soon come to an end. He closed his eyes, the sun beating down on face and he smiled. He smiled for the first time in as long as he could remember. The rain and wind abruptly stopped, but the sky still had the gray swirls of storms in the distance. Dave knew this feeling all too well. The calm before the storm. He only had a limited amount of time before all Hell broke loose, but he stopped to admire the calmness. Maybe it would be different this time, he thought, with the knowledge deep within that it wouldn't.You can decide what you want to do in life, but I suggest doing something that creates. Something that leaves a tangible thing once you're done. That way even after you're gone, you will still live on in the things you created.\n\nThe robot clicked disapprovingly, gurgled briefly inside its cubical interior and extruded a pony glass of brownish liquid. Sir, you will undoubtedly end up in a drunkard's grave, dead of hepatic cirrhosis, it informed me virtuously as it returned my ID card. I glared as I pushed the glass across the table.Turning away from the ledge, he started slowly down the mountain, deciding that he would, that very night, satisfy his curiosity about the man-house. In the meantime, he would go down into the canyon and get a cool drink, after which he would visit some berry patches just over the ridge, and explore among the foothills a bit before his nap-time, which always came just after the sun had walked past the middle of the sky.\n\n At that period of the day the sun’s warm rays seemed to cast a sleepy spell over the silent mountainside, so all of the animals, with one accord, had decided it should be the hour for their mid-day sleep.He looked at the sand. Picking up a handful, he wondered how many grains were in his hand. Hundreds of thousands? Not enough, the said under his breath. I need more.You know that tingly feeling you get on the back of your neck sometimes? I just got that feeling when talking with her. You know I don't believe in sixth senses, but there is something not right with her. I don't know how I know, but I just do.Dave wasn't exactly sure how he had ended up in this predicament. He ran through all the events that had lead to this current situation and it still didn't make sense.\n\n He wanted to spend some time to try and make sense of it all, but he had higher priorities at the moment. The first was how to get out of his current situation of being naked in a tree with snow falling all around and no way for him to get down.She had been an angel for coming up on 10 years and in all that time nobody had told her this was possible. The fact that it could ever happen never even entered her mind. Yet there she stood, with the undeniable evidence sitting on the ground before her. Angels could lose their wings.He knew what he was supposed to do. That had been apparent from the beginning. That was what made the choice so difficult. What he was supposed to do and what he would do were not the same. This would have been fine if he were willing to face the inevitable consequences, but he wasn't.Was it enough? That was the question he kept asking himself. Was being satisfied enough? He looked around him at everyone yearning to just be satisfied in their daily life and he had reached that goal. He knew that he was satisfied and he also knew it wasn't going to be enough.It had been her dream for years but Dana had failed to take any action toward making it come true. There had always been a good excuse to delay or prioritize another project. As she woke, she realized she was once again at a crossroads. Would it be another excuse or would she finally find the courage to pursue her dream? Dana rose and took her first step.Since they are still preserved in the rocks for us to see, they must have been formed quite recently, that is, geologically speaking. What can explain these striations and their common orientation? Did you ever hear about the Great Ice Age or the Pleistocene Epoch? Less than one million years ago, in fact, some 12,000 years ago, an ice sheet many thousands of feet thick rode over Burke Mountain in a southeastward direction. The many boulders frozen to the underside of the ice sheet tended to scratch the rocks over which they rode.\n\n The scratches or striations seen in the park rocks were caused by these attached boulders. The ice sheet also plucked and rounded Burke Mountain into the shape it possesses today.It was just a burger. Why couldn't she understand that? She knew he'd completely changed his life around her eating habits, so why couldn't she give him a break this one time? She wasn't even supposed to have found out. Yes, he had promised her and yes, he had broken that promise, but still in his mind, all it had been was just a burger.It's not his fault. I know you're going to want to, but you can't blame him. He really has no idea how it happened. I kept trying to come up with excuses I could say to mom that would keep her calm when she found out what happened, but the more I tried, the more I could see none of them would work. He was going to get her wrath and there was nothing I could say to prevent it.Her eyebrows were a shade darker than her hair. They were thick and almost horizontal, emphasizing the depth of her eyes.\n\n She was rather handsome than beautiful. Her face was captivating by reason of a certain frankness of expression and a contradictory subtle play of features. Her manner was engaging.The shoes had been there for as long as anyone could remember. In fact, it was difficult for anyone to come up with a date they had first appeared. It had seemed they'd always been there and yet they seemed so out of place. Why nobody had removed them was a question that had been asked time and again, but while they all thought it, nobody had ever found the energy to actually do it. So, the shoes remained on the steps, out of place in one sense, but perfectly normal in another.\n\nThe leather jacked showed the scars of being his favorite for years. It wore those scars with pride, feeling that they enhanced his presence rather than diminishing it. The scars gave it character and had not overwhelmed to the point that it had become ratty. The jacket was in its prime and it knew it.There was little doubt that the bridge was unsafe. All one had to do was look at it to know that with certainty. Yet Bob didn't see another option. He may have been able to work one out if he had a bit of time to think things through, but time was something he didn't have. A choice needed to be made, and it needed to be made quickly.He wondered if he should disclose the truth to his friends. It would be a risky move. Yes, the truth would make things a lot easier if they all stayed on the same page, but the truth might fracture the group leaving everything in even more of a mess than it was not telling the truth. It was time to decide which way to go.";
  let allChapters = [
    "Random chapter1",
    "Random chapter2",
    "Random chapter3",
    "Random chapter4",
    "Random chapter5",
    "Random chapter6",
    "Random chapter7",
    "Random chapter8",
    "Random chapter9",
    "Random chapter10",
    "Random chapter11",
    "Random chapter12",
    "Random chapter13",
    "Random chapter14",
    "Random chapter15",
    "Random chapter16",
    "Random chapter17",
    "Random chapter18",
    "Random chapter19",
    "Random chapter20",
  ];
  let comments = [
    {
      name: "Bruh",
      comment: "This is getting interesting",
      date: "12/01/2020",
    },
    {
      name: "Uzumaki",
      comment:
        "Violence isn't the answer, its the question.\nAnd the answer is Yes",
      date: "12/01/2020",
    },
    {
      name: "RippleEffect07",
      comment: "Damn these cliffhangers",
      date: "12/01/2020",
    },
    {
      name: "Bean",
      comment: "I like this",
      date: "12/01/2020",
    },
  ];
  const handleFontSize = () => {
    if (fontSizeVal == 0) {
      setFontSize("smallFont");
    } else if (fontSizeVal == 1) {
      setFontSize("mediumFont");
    } else if (fontSizeVal == 2) {
      setFontSize("largeFont");
    } else if (fontSizeVal == 3) {
      setFontSize("largestFont");
    }
  };
  const toggleColor = () => {
    setDarkMode(!darkMode);
  };
  useEffect(() => {
    handleFontSize();
  }, [fontSizeVal]);
  return (
    <div className="chapterPage">
      <div className="chapterPage-top">
        <section className="left">
          <Route
            render={({ history }) => (
              <CgDarkMode
                className="logo"
                onClick={() => {
                  history.push(`/home`);
                }}
              />
            )}
          />

          <p className="info">
            <span className="bookName">{book}</span>
            <BsChevronRight className="div" />
            <span className="currentChapter">{chapter}</span>
          </p>
        </section>
        <section className="middle">
          <FaChevronLeft className="chevron" />
          <p
            className="currentChapter"
            onClick={() => {
              setChapterSelectionPopupVis(!chapterSelectionPopupVis);
            }}
          >
            #{id}
          </p>
          <FaChevronRight className="chevron" />
          <div
            className={`chapterSelectionPopup ${
              chapterSelectionPopupVis ? "popupVisible" : ""
            }`}
          >
            <section className="goto">
              <input
                type="number"
                className="chapterInput"
                value={chapterInput}
                onChange={(e) => {
                  if (+e.target.value <= allChapters.length) {
                    setChapterInput(e.target.value);
                  }
                }}
              />
              <button className="gotoBtn">Load</button>
            </section>
            <ul className="chapterList">
              {allChapters.map((chapter, index) => {
                return (
                  <li className="chapter">
                    #{index + 1} {chapter}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <section className="right">
          <AiOutlineFontSize
            className="customization"
            onClick={() => {
              setFontPopupVis(!fontPopupVis);
            }}
          />
          <IoMdColorPalette
            className="customization"
            onClick={() => {
              toggleColor();
            }}
          />
          <div className={`fontPopup ${fontPopupVis ? "popupVisible" : ""}`}>
            <div className="fontSize">
              <p className="fontSizeText">Font Size: </p>
              <input
                type="range"
                min="0"
                max="3"
                step="1"
                value={fontSizeVal}
                onChange={(e) => setFontSizeVal(e.target.value)}
              ></input>
            </div>
            {/* <div className="letterSpacing">
              <p className="letterSpacingText">Letter Spacing: </p>
              <input type="range" min="0" max="3" step="1"></input>
            </div> */}
          </div>
        </section>
      </div>
      <div className={`chapterPage-body ${darkMode ? "darkChapterBody" : ""}`}>
        <div className={`chapterPage-chapter`}>
          <div className={`${fontSize} ${letterSpacing}`}>{chapterText}</div>
        </div>
        <div
          className={`chapterPage-comments ${darkMode ? "darkComments" : ""}`}
        >
          <p className="heading">Comments</p>
          <section className="myComment">
            <textarea
              type="text"
              className="commentInput"
              value={myComment}
              placeholder="Write comment here"
              onChange={(e) => setMyComment(e.target.value)}
            ></textarea>
            {myComment.length > 0 && (
              <button className="commentSubmit">Submit</button>
            )}
          </section>
          <ul className="comments">
            {comments.map((item) => {
              return (
                <li className="comment">
                  <div className="head">
                    <p className="user">{item.name}</p>
                    <p className="date">{item.date}</p>
                  </div>
                  <p className="commentText">{item.comment}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Chapter;
