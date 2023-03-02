import IdeasApi from "../services/ideasApi";

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector("#idea-list");
    this._ideas = [];
    //fetches ideas from api
    this.getIdeas();
    //new set created for tags
    this._validTags = new Set();
    //add method comes from set: The add() method inserts a new element with a specified value in to a Set object, if there isn't an element with the same value already
    this._validTags.add("technology");
    this._validTags.add("software");
    this._validTags.add("business");
    this._validTags.add("education");
    this._validTags.add("health");
    this._validTags.add("inveantions");
  }

  //add event listener method and target icon
  addEventListeners() {
    this._ideaListEl.addEventListener("click", (e) => {
      //delete button
      if (e.target.classList.contains("fa-times")) {
        e.stopImmediatePropagation();
        //need id: <div class="card" data-id="${idea._id}">
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(ideaId);
      }
    });
  }

  //its a promise
  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data;
      console.log("ideas:", this._ideas);
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  //delete from the dom and server
  async deleteIdea(ideaId) {
    try {
      // Delete from server
      const res = await IdeasApi.deleteIdea(ideaId);
      //delete from the DOM
      this._ideas.filter((idea) => idea._id !== ideaId);
      //get the ideas again and its gonna reneder
      this.getIdeas();
    } catch (error) {
      alert("You can not delete this resource");
    }
  }
  //when the idea is submitted(without this i need to rerender the page) add it to the list
  addIdeaToList(idea) {
    this._ideas.push(idea);
    //rerender the component
    this.render();
  }

  // it assigns the tag category
  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = "";
    //a method from set, has() checks if sth is included
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = "";
    }
    return tagClass;
  }
  //rendering those ideas in cards
  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        //if it is my user I see the btn or not
        const deleteBtn =
          idea.username === localStorage.getItem("username")
            ? `<button class="delete"><i class="fas fa-times"></i></button>`
            : "";
        return `
      <div class="card" data-id="${idea._id}">
     ${deleteBtn}
      <h3>
        ${idea.text}
      </h3>
      <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
      <p>
        Posted on <span class="date">${idea.date}</span> by
        <span class="author">${idea.username}</span>
      </p>
    </div>
      `;
      })
      .join("");
    //join to get rid of ',' between the ideas objects
    //event on button
    this.addEventListeners();
  }
}

export default IdeaList;
