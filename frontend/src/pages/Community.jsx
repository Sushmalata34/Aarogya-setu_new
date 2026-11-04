
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
    name: "Senior citizens",
    role: "Senior citizen",
    icon: "🤝",
    description:
      "Interested in helping people and sharing useful resources.",
  },
  {
    name: "Care Support Member",
    role: "Caregiver",
    icon: "💙",
    description:
      "Interested in caregiving information and support.",
  },
  {
    name: "Accessibility Advocate",
    role: "Community Member",
    icon: "♿",
    description:
      "Interested in accessibility and inclusive communities.",
  },
];

const groups = [
  {
    id: 1,
    icon: "🌷",
    name: "Senior Citizens Circle",
    description:
      "A welcoming space for sharing experiences and everyday tips.",
    fullDescription:
      "A friendly community where senior citizens can share life experiences, discuss daily challenges, exchange health tips and build meaningful friendships.",
    members: 120,
    topics: [
      "Daily Life",
      "Health & Wellness",
      "Friendship",
      "Experiences",
    ],
    posts: [
      "Welcome! Introduce yourself and share something about your day.",
      "What are your favourite activities to stay active and happy?",
      "Share your useful daily health and wellness tips.",
    ],
  },
  {
    id: 2,
    icon: "♿",
    name: "Accessibility & Inclusion",
    description:
      "Discuss accessibility ideas and inclusive opportunities.",
    fullDescription:
      "A supportive space to discuss accessibility, assistive technology, disability awareness and opportunities for creating an inclusive society.",
    members: 85,
    topics: [
      "Accessibility",
      "Assistive Technology",
      "Inclusion",
      "Disability Support",
    ],
    posts: [
      "What accessibility features make websites easier to use?",
      "Share useful assistive technology resources.",
      "Let's discuss ideas for a more inclusive community.",
    ],
  },
  {
    id: 3,
    icon: "💗",
    name: "Caregivers Support Group",
    description:
      "Share caregiving tips and encourage one another.",
    fullDescription:
      "A caring community for family members and caregivers. Share experiences, practical caregiving advice and emotional support.",
    members: 95,
    topics: [
      "Caregiving Tips",
      "Family Support",
      "Wellness",
      "Advice",
    ],
    posts: [
      "Share one helpful tip for taking care of elderly family members.",
      "How do you manage your daily caregiving routine?",
      "Let's support and encourage fellow caregivers.",
    ],
  },
];

function Community({ onNavigate = () => {} }) {
  const [activeTab, setActiveTab] = useState("posts");

  const [posts, setPosts] = useState(initialPosts);

  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");

  const [selectedGroup, setSelectedGroup] = useState(null);

  const [joinedGroups, setJoinedGroups] = useState([]);
  const [connectedPeople, setConnectedPeople] = useState([]);

  // ADD COMMUNITY POST
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

    setPosts((previousPosts) => [
      newPost,
      ...previousPosts,
    ]);

    setAuthor("");
    setMessage("");

    setNotice("Your post has been added successfully.");
  }

  // LIKE POST
  function handleLike(postId) {
    setPosts((previousPosts) =>
      previousPosts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  }

  // CONNECT / DISCONNECT PEOPLE
  function handleConnect(personName) {
    const alreadyConnected =
      connectedPeople.includes(personName);

    setConnectedPeople((previous) =>
      alreadyConnected
        ? previous.filter((name) => name !== personName)
        : [...previous, personName]
    );
  }

  // OPEN GROUP DETAILS
  function openGroup(group) {
    setSelectedGroup(group);
    setNotice("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // BACK TO SUPPORT GROUPS
  function backToGroups() {
    setSelectedGroup(null);
    setActiveTab("groups");
    setNotice("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // JOIN / LEAVE GROUP
  function handleJoinGroup(groupId) {
    const alreadyJoined = joinedGroups.includes(groupId);

    setJoinedGroups((previous) =>
      alreadyJoined
        ? previous.filter((id) => id !== groupId)
        : [...previous, groupId]
    );
  }

  return (
    <div className="community-page">

      {/* COMMUNITY HERO */}

      {!selectedGroup && (
        <section className="community-hero">

          <p className="section-eyebrow">
            YOU ARE NOT ALONE
          </p>

          <h1>Welcome to Our Community</h1>

          <p>
            Share experiences, connect with people and find
            encouragement in a respectful and inclusive space.
          </p>

          <button
            onClick={() => {
              setActiveTab("posts");
              setNotice("");
            }}
          >
            Explore Community
          </button>

        </section>
      )}

      <section className="community-content">

        {/* GROUP DETAIL PAGE */}

        {selectedGroup ? (

          <section className="community-panel group-detail-page">

            <button
              className="group-back-button"
              onClick={backToGroups}
            >
              ← Back to Support Groups
            </button>

            <div className="group-detail-hero">

              <div className="group-detail-icon">
                {selectedGroup.icon}
              </div>

              <p className="section-eyebrow">
                AAROGYA SETU COMMUNITY
              </p>

              <h1>{selectedGroup.name}</h1>

              <p>
                {selectedGroup.fullDescription}
              </p>

              <div className="group-member-count">
                👥 {selectedGroup.members} Community Members
              </div>

              <button
                className="group-join-button"
                onClick={() =>
                  handleJoinGroup(selectedGroup.id)
                }
              >
                {joinedGroups.includes(selectedGroup.id)
                  ? "✓ Joined Group - Leave Group"
                  : "Join This Group"}
              </button>

            </div>

            {/* ABOUT GROUP */}

            <div className="group-detail-section">

              <h2>About This Group</h2>

              <p>
                {selectedGroup.description}
              </p>

            </div>

            {/* GROUP TOPICS */}

            <div className="group-detail-section">

              <h2>Topics We Discuss</h2>

              <div className="group-topic-list">

                {selectedGroup.topics.map((topic) => (
                  <span key={topic}>
                    {topic}
                  </span>
                ))}

              </div>

            </div>

            {/* GROUP DISCUSSIONS */}

            <div className="group-detail-section">

              <h2>Group Discussions</h2>

              <p className="group-section-subtitle">
                Explore topics and share your thoughts
                with the community.
              </p>

              <div className="group-discussion-list">

                {selectedGroup.posts.map((post, index) => (
                  <article
                    className="group-discussion-card"
                    key={index}
                  >

                    <div className="discussion-icon">
                      💬
                    </div>

                    <div>

                      <h3>
                        Discussion {index + 1}
                      </h3>

                      <p>{post}</p>

                    </div>

                  </article>
                ))}

              </div>

            </div>

            <div className="group-detail-footer">
              💙 Together we can create a caring
              and supportive community.
            </div>

          </section>

        ) : (

          <>

            {/* COMMUNITY TABS */}

            <div
              className="community-tabs"
              role="tablist"
              aria-label="Community sections"
            >

              <button
                className={
                  activeTab === "posts" ? "active" : ""
                }
                onClick={() => {
                  setActiveTab("posts");
                  setNotice("");
                }}
              >
                💬 Community Posts
              </button>

              <button
                className={
                  activeTab === "people" ? "active" : ""
                }
                onClick={() => {
                  setActiveTab("people");
                  setNotice("");
                }}
              >
                🤝 Connect with People
              </button>

              <button
                className={
                  activeTab === "groups" ? "active" : ""
                }
                onClick={() => {
                  setActiveTab("groups");
                  setNotice("");
                }}
              >
                💙 Support Groups
              </button>

            </div>

            {/* COMMUNITY POSTS */}

            {activeTab === "posts" && (

              <section className="community-panel">

                <div className="community-panel-heading">

                  <h2>Community Posts</h2>

                  <p>
                    Share something helpful with the community.
                  </p>

                </div>

                <form
                  className="community-post-form"
                  onSubmit={handleAddPost}
                >

                  <label htmlFor="community-author">
                    Your name
                  </label>

                  <input
                    id="community-author"
                    value={author}
                    onChange={(event) =>
                      setAuthor(event.target.value)
                    }
                    placeholder="Enter your name"
                    maxLength={60}
                  />

                  <label htmlFor="community-message">
                    Your message
                  </label>

                  <textarea
                    id="community-message"
                    value={message}
                    onChange={(event) =>
                      setMessage(event.target.value)
                    }
                    placeholder="Share an experience, idea or encouraging message..."
                    rows={4}
                    maxLength={1000}
                  />

                  <button type="submit">
                    Publish Post
                  </button>

                  {notice && (
                    <p className="community-notice">
                      {notice}
                    </p>
                  )}

                </form>

                <div className="community-post-list">

                  {posts.map((post) => (

                    <article
                      className="community-post"
                      key={post.id}
                    >

                      <div className="community-post-top">

                        <div className="community-avatar">
                          💙
                        </div>

                        <div>
                          <h3>{post.author}</h3>
                          <span>{post.category}</span>
                        </div>

                      </div>

                      <p className="community-post-message">
                        {post.message}
                      </p>

                      <button
                        className="community-like-button"
                        onClick={() => handleLike(post.id)}
                      >
                        💙 Helpful ({post.likes})
                      </button>

                    </article>

                  ))}

                </div>

              </section>

            )}

            {/* CONNECT WITH PEOPLE */}

            {activeTab === "people" && (

              <section className="community-panel">

                <div className="community-panel-heading">

                  <h2>Connect with People</h2>

                  <p>
                    Meet people, build friendships and
                    support one another.
                  </p>

                  <p className="connected-count">
                    🤝 Connected People: {connectedPeople.length}
                  </p>

                </div>

                <div className="community-cards">

                  {people.map((person) => {

                    const isConnected =
                      connectedPeople.includes(person.name);

                    return (

                      <article
                        className="community-person-card"
                        key={person.name}
                      >

                        <div className="community-person-icon">
                          {person.icon}
                        </div>

                        <h3>{person.name}</h3>

                        <span className="community-role">
                          {person.role}
                        </span>

                        <p>{person.description}</p>

                        <button
                          className={
                            isConnected
                              ? "connected-button"
                              : ""
                          }
                          onClick={() =>
                            handleConnect(person.name)
                          }
                        >
                          {isConnected
                            ? "✓ Connected"
                            : "Connect"}
                        </button>

                      </article>

                    );

                  })}

                </div>

              </section>

            )}

            {/* SUPPORT GROUPS */}

            {activeTab === "groups" && (

              <section className="community-panel">

                <div className="community-panel-heading">

                  <h2>Support Groups</h2>

                  <p>
                    Explore groups designed around shared
                    interests and support.
                  </p>

                </div>

                <div className="community-cards">

                  {groups.map((group) => (

                    <article
                      className="community-group-card"
                      key={group.id}
                    >

                      <div className="community-person-icon">
                        {group.icon}
                      </div>

                      <h3>{group.name}</h3>

                      <p>{group.description}</p>

                      <button
                        onClick={() => openGroup(group)}
                      >
                        View Group →
                      </button>

                    </article>

                  ))}

                </div>

              </section>

            )}

            {/* BACK TO HOME */}

            <div className="community-back-action">

              <button
                onClick={() => onNavigate("home")}
              >
                ← Back to Home
              </button>

            </div>

          </>

        )}

      </section>

    </div>
  );
}

export default Community;
