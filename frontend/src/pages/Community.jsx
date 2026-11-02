
import { useState } from "react";
import "../styles/Community.css";

const initialPosts = [
  {
    id: 1,
    author: "Aarogya Community",
    category: "Community Update",
    message:
      "Welcome to Aarogya Setu! Share experiences, exchange helpful ideas and support one another.",
    likes: 3,
  },
  {
    id: 2,
    author: "Care & Support",
    category: "Caregiving",
    message:
      "Small acts of kindness can make everyday life easier. Let's build a community where everyone feels included.",
    likes: 5,
  },
];

const people = [
  {
    name: "Community Volunteer",
    role: "Volunteer",
    icon: "🤝",
    description: "Interested in helping people and sharing useful resources.",
  },
  {
    name: "Care Support Member",
    role: "Caregiver",
    icon: "💙",
    description: "Interested in caregiving information and support.",
  },
  {
    name: "Accessibility Advocate",
    role: "Community Member",
    icon: "♿",
    description: "Interested in accessibility and inclusive communities.",
  },
];

const groups = [
  {
    icon: "🌷",
    name: "Senior Citizens Circle",
    description: "A welcoming space for sharing experiences and everyday tips.",
  },
  {
    icon: "♿",
    name: "Accessibility & Inclusion",
    description: "Discuss accessibility ideas and inclusive opportunities.",
  },
  {
    icon: "💗",
    name: "Caregivers Support Group",
    description: "Share caregiving tips and encourage one another.",
  },
];

function Community({ onNavigate = () => {} }) {
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState(initialPosts);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");

  function handleAddPost(event) {
    event.preventDefault();

    if (!author.trim() || !message.trim()) {
      setNotice("Please enter your name and post message.");
      return;
    }

    const newPost = {
      id: Date.now(),
      author: author.trim(),
      category: "Community Post",
      message: message.trim(),
      likes: 0,
    };

    setPosts((previousPosts) => [newPost, ...previousPosts]);
    setAuthor("");
    setMessage("");
    setNotice("Your post has been added to this demo page.");
  }

  function handleLike(postId) {
    setPosts((previousPosts) =>
      previousPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  }

  return (
    <main className="community-page">
      <section className="community-hero">
        <p className="section-eyebrow">YOU ARE NOT ALONE</p>
        <h1>Welcome to Our Community</h1>
        <p>
          Share experiences, connect with people and find encouragement
          in a respectful and inclusive space.
        </p>
        <button onClick={() => setActiveTab("posts")}>
          Explore Community
        </button>
      </section>

      <section className="community-content">
        <div className="community-tabs" role="tablist" aria-label="Community sections">
          <button
            className={activeTab === "posts" ? "active" : ""}
            onClick={() => setActiveTab("posts")}
          >
            💬 Community Posts
          </button>
          <button
            className={activeTab === "people" ? "active" : ""}
            onClick={() => setActiveTab("people")}
          >
            🤝 Connect with People
          </button>
          <button
            className={activeTab === "groups" ? "active" : ""}
            onClick={() => setActiveTab("groups")}
          >
            💙 Support Groups
          </button>
        </div>

        {activeTab === "posts" && (
          <section className="community-panel">
            <div className="community-panel-heading">
              <h2>Community Posts</h2>
              <p>Share something helpful with the community.</p>
            </div>

            <form className="community-post-form" onSubmit={handleAddPost}>
              <label htmlFor="community-author">Your name</label>
              <input
                id="community-author"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                placeholder="Enter your name"
                maxLength={60}
              />

              <label htmlFor="community-message">Your message</label>
              <textarea
                id="community-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Share an experience, idea or encouraging message..."
                rows={4}
                maxLength={1000}
              />

              <button type="submit">Publish Post</button>
              {notice && <p className="community-notice">{notice}</p>}
            </form>

            <div className="community-post-list">
              {posts.map((post) => (
                <article className="community-post" key={post.id}>
                  <div className="community-post-top">
                    <div className="community-avatar">💙</div>
                    <div>
                      <h3>{post.author}</h3>
                      <span>{post.category}</span>
                    </div>
                  </div>

                  <p className="community-post-message">{post.message}</p>

                  <button
                    className="community-like-button"
                    onClick={() => handleLike(post.id)}
                    aria-label={`Like post by ${post.author}`}
                  >
                    💙 Helpful ({post.likes})
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "people" && (
          <section className="community-panel">
            <div className="community-panel-heading">
              <h2>Connect with People</h2>
              <p>Example community profiles for the website demo.</p>
            </div>

            <div className="community-cards">
              {people.map((person) => (
                <article className="community-person-card" key={person.name}>
                  <div className="community-person-icon">{person.icon}</div>
                  <h3>{person.name}</h3>
                  <span className="community-role">{person.role}</span>
                  <p>{person.description}</p>
                  <button
                    onClick={() =>
                      setNotice(
                        `Connection requests for ${person.name} can be added with the backend later.`
                      )
                    }
                  >
                    Connect
                  </button>
                </article>
              ))}
            </div>

            {notice && <p className="community-notice">{notice}</p>}
          </section>
        )}

        {activeTab === "groups" && (
          <section className="community-panel">
            <div className="community-panel-heading">
              <h2>Support Groups</h2>
              <p>Explore groups designed around shared interests and support.</p>
            </div>

            <div className="community-cards">
              {groups.map((group) => (
                <article className="community-group-card" key={group.name}>
                  <div className="community-person-icon">{group.icon}</div>
                  <h3>{group.name}</h3>
                  <p>{group.description}</p>
                  <button
                    onClick={() =>
                      setNotice(
                        `${group.name} membership can be connected to the backend later.`
                      )
                    }
                  >
                    View Group
                  </button>
                </article>
              ))}
            </div>

            {notice && <p className="community-notice">{notice}</p>}
          </section>
        )}

        <div className="community-back-action">
          <button onClick={() => onNavigate("home")}>← Back to Home</button>
        </div>
      </section>
    </main>
  );
}

export default Community;
