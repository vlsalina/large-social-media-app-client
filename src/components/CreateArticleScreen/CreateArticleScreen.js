import ArticleEditor from "../ArticleEditor/ArticleEditor";
import Header from "../Header/Header";
import "./CreateArticleScreen.css";

const CreateArticleScreen = () => {
  return (
    <div className="createarticle">
      <Header />
      <div className="createarticle--box-1">
        <ArticleEditor />
      </div>
    </div>
  );
};

export default CreateArticleScreen;
