Documentation - Website layout & keywords

# Complete Website Layout Design & Glossary
## 1. Main Navigation & Structure
### Primary Navigation Bar (Fixed Top)
- **Left Section**:
- Logo "BallSim" with bouncing ball animation
- Home button
- Explore dropdown (Gallery, Featured Simulations, Community Challenges)
- Learn dropdown (Tutorials, Documentation)
- **Center Section**:
- Create button (prominent, highlighted) - Main call to action
- **Right Section**:
- Search bar (for finding simulations and resources)
- User account icon/dropdown
- Settings icon/dropdown
- Help/support icon
### Account System
- **Guest Mode**: Limited features, simulation data stored in local storage
- **Registered Users**: Cloud saves, community participation, achievements
- **Sign-up/Login**:
- Email registration
- Google integration
- Username-only option (no email required)
- **User Profile**:
- Username/avatar
- About Me section (customizable bio)
- Social media promotion links (YouTube, Twitter/X, Instagram, TikTok)
- Saved simulations library
- Achievements display
- Public/private sharing settings
## 2. Homepage Layout
### Hero Section
- **Main Banner**: Dynamic simulation showcasing the engine's capabilities
- **Tagline**: "Create Satisfying Ball Physics Simulations"
- **CTA Buttons**:
- "Create New Simulation" (primary)
- "Try AI Generator" (secondary)
- "Explore Gallery" (tertiary)
### Featured Content (Separate Carousels)
- **Editor's Picks Carousel**:
- Curated selection of exceptional simulations
- Each card shows preview thumbnail, title, creator name, and "Try It" button
- Horizontal scrolling with pagination indicators
- **Popular Community Simulations Carousel**:

- Most-liked or most-viewed community creations
- Similar card format with engagement metrics (views, likes)
- Horizontal scrolling with pagination indicators
### Achievement Progress Display
- **Visual Progress Bar**: Thin, horizontal multi-segment bar showing overall completion
percentage
- **Latest Achievement**: Small icon of most recently earned achievement with name tooltip
- **Quick Stats**: "X/Y achievements unlocked" with small icon
- **Interaction**: Clicking opens a compact dropdown with 3-5 next available achievements
- **Non-intrusive**: Takes minimal vertical space while providing meaningful progress feedback
### Quick Start Section
- **Three Paths**:
1. "AI-Generated Scenes" - Use AI to create from text description
2. "Block Editor" - Visual programming interface
3. "Code Editor" - Direct code access for advanced users
- Visual previews of each path with brief descriptions
- "Get Started" button for each option
### Statistics Bar
- Number of simulations created
- Community size
- Achievement progress for logged-in users
### Footer
- About section
- Terms of service/Privacy
- Contact information
- Social media links
## 3. Simulation Creator Environment
### Creator Header (With Dependencies)
- Project name (editable)
- Save button (always available, prompts login if user is not authenticated)
- Export button (enabled only after initial save)
- Share button (enabled only after initial save, requires login)
- Settings dropdown (always available)
- Exit button (with save prompt if changes detected)
- **Status Indicators**: Small icons showing save status, login status
### Performance Indicator
- **Toggle Button**: Small eye icon in corner of canvas
- **Display Options**: Compact mode (FPS only) or detailed mode (FPS, object count, memory
usage)
- **Visibility State**: Remembers last setting per user
### Creator Layout (Three Modes)
#### AI Generator Mode
- **Left Panel**:

- Text input area for simulation description
- History of previous prompts
- Suggested prompt examples
- **Main Canvas**:
- Clean, maximized simulation display
- Performance indicator (toggleable)
- **Right Panel**:
- Generated code preview (collapsible)
- Simulation parameters to adjust
- "Save as video" button
- Video export options (quality, format, duration)
#### Block Editor Mode
- **Left Panel**:
- Combined workspace and palette in split view
- Block categories at top (tabs: Physics, Objects, Events, etc.)
- Block palette below categories (scrollable, searchable)
- Workspace area below palette (drag & drop happens within same panel)
- **Main Canvas**:
- Simulation display
- Toggle between "Build" and "Run" modes
- **Right Panel**:
- Inspector for selected objects:
- Object type, ID, current position
- Editable properties (size, color, physics parameters)
- Event connections
- Custom properties added by user
- Debugging information (collapsible)
#### Code Editor Mode
- **Left Panel**:
- Object hierarchy
- Resource library
- **Main Canvas**:
- Simulation display
- Debug overlay (toggleable)
- **Right Panel**:
- Code editor with syntax highlighting
- Documentation quick access
- Console output
- Error feedback
### Common Elements (All Modes)
- **Bottom Panel**:
- Timeline controls (play, pause, speed adjustment)
- Performance tier selector (Low, Medium, High)

- Resource monitor (toggleable)
- Frame-by-frame navigation controls
## 4. Gallery/Community Section
### Gallery Header
- **Filters**:
- Popular/Recent/Featured toggles
- Category dropdown
- Complexity level filter
- Performance requirement filter
- **Sort Options**:
- Most liked
- Most viewed
- Recently updated
- Most cloned
### Gallery Grid
- Simulation preview thumbnails
- Creator username
- Like/favorite counts
- Brief description
- Performance tier indicator
### Simulation Detail Page
- **Preview Area**: Large simulation display with run controls
- **Info Section**:
- Title and description
- Creator profile link
- Creation/update dates
- Like/Clone buttons
- Social sharing options
- **Action Buttons**:
- "Run in Full Screen"
- "Clone and Edit"
- "Download Recording"
- **Comments Section**: Community feedback and discussion
## 5. Learning Section
### Tutorials Hub
- **Beginner Track**:
- Introduction to the interface
- Creating your first simulation
- Understanding physics parameters
- **Intermediate Track**:
- Working with interactive objects
- Advanced collision mechanics
- Visual effects and trails

- **Advanced Track**:
- Complex scene creation
- Performance optimization
- Custom physics rules
### Tutorial Page Layout
- **Video/Interactive Demo**: Step-by-step walkthrough
- **Written Instructions**: Text version of tutorial
- **Interactive Elements**: "Try it yourself" sections
- **Progress Tracker**: Mark completed tutorials
- **Next Steps**: Suggested follow-up tutorials
### Documentation Portal
- **API Reference**: Complete function listing
- **Object Types**: Ball, Container, Zone, etc.
- **Event System**: Available events and handlers
- **Example Library**: Code snippets for common tasks
- **Troubleshooting**: Common issues and solutions
## 6. User Profile Pages
### Profile Header
- Avatar and username
- About Me text
- Social media promotion links
- Achievement showcase
- Join date and activity stats
### Profile Tabs
- **My Simulations**: Grid of personal creations
- **Favorites**: Saved simulations from other creators
- **Achievement Progress**: Visual representation of earned/unearned badges
- **Activity Feed**: Recent actions and community interactions
### Settings Page
- **Account Settings**: Email, password, username
- **Profile Settings**: Avatar, about me, social links
- **Notification Preferences**: Email, site notifications
- **Privacy Settings**: Default sharing options, activity visibility
- **Accessibility Options**: Color schemes, keyboard shortcuts, etc.
## 7. Mobile-Specific Layout Adaptations
### Mobile Navigation
- Hamburger menu replacing dropdown categories
- Simplified bottom navigation bar with essential options:
- Home
- Create
- Explore
- Profile
### Mobile Creator

- Modes remain the same but with adapted layouts:
- Full-screen canvas with overlay controls
- Swipeable panels (left/right)
- Touch-optimized block editor
- Simplified code editor with autocomplete suggestions
### Responsive Adjustments
- Single-column layout for gallery and tutorials
- Tap-to-expand detail sections
- Larger touch targets for interactive elements
- All layouts optimized exclusively for portrait mode (taller than wider)
- No special landscape mode considerations - content scales but layout remains consistent
## 8. Special Features Integration
### Achievement System
- **Achievement Panel**: Accessible from profile and header notification
- **Unlock Animations**: Subtle notifications when achievements are earned
- **Progress Indicators**: Visual representation of multi-step achievements
### Simulation Recording
- **Record Controls**: Within simulation environment
- **Quality Settings**: Frame rate, resolution options
- **Format Options**: GIF, MP4, WebM
- **Sharing Panel**: Direct integration with social platforms
### Accessibility Features
- **Settings Panel**: Accessible from all pages
- **Preference Controls**:
- Text size adjustments
- Contrast options
- Motion reduction
- Screen reader compatibility settings
### Resource Monitoring
- **Performance Overlay**: Toggleable from simulation environment
- **Metrics Display**:
- FPS counter
- Object count
- Memory usage
- Rendering time
---
# Key Terms Glossary
## Content Creation Terms
**Simulation**: A physics-based interactive scene created with the ball physics engine, consisting
of objects that interact according to defined rules.
**AI-Generated Scene**: A simulation automatically created from a text description using AI, not

manually coded by the user.
**Block Editor**: Visual programming interface where users connect functional blocks to create
simulations without writing code, similar to Scratch.
**Code Editor**: Text-based programming interface where users write JavaScript code directly to
create simulations.
**Save**: Storing the current simulation state and code to the user's account or local storage. Not
the same as exporting or recording.
**Save as Video**: The process of generating a frame-by-frame simulation and compiling it into a
video file, ensuring smooth playback regardless of runtime performance.
**Export**: Creating a standalone, shareable version of a simulation (could be code, embedded
player, or other format).
**Clone**: Creating a copy of an existing simulation that can be modified independently of the
original.
**Performance Tier**: User-selectable processing power allocation (Low/Medium/High) that
affects maximum object count, physics precision, and visual effects.
## Interface Elements
**Canvas**: The main display area where the simulation runs visually.
**Block Palette**: Collection of available programming blocks categorized by function.
**Workspace**: The area where blocks are arranged and connected in the Block Editor mode.
**Inspector**: A properties panel that displays and allows editing of the selected object's attributes
(position, size, color, physics properties, etc.).
**Timeline Controls**: Interface for playing, pausing, and adjusting simulation speed.
**Resource Monitor**: Visual display of performance metrics (FPS, object count, memory usage)
that can be toggled on/off.
**Gallery Grid**: Display of multiple simulation thumbnails in rows and columns with filtering
options.
## Technical Features
**Object Pooling**: Performance optimization technique reusing inactive objects instead of
creating new ones.
**Quadtree**: Spatial partitioning system used for efficient collision detection between objects.
**Frame-by-frame Generation**: Process of rendering each frame of a simulation sequentially for
video export, not dependent on real-time performance.

**Progressive Loading**: Loading essential features first, then adding complexity as needed for
improved initial loading times.
**Autosave**: Automatic periodic saving of user's work to prevent loss.
## Physics Simulation Elements
**Ball**: Basic circular physics object with properties like position, velocity, size, and color.
**Container**: Circular boundary that balls can interact with, may contain "cuts" (openings).
**Zone**: Defined area that can detect when balls enter or exit, triggering events.
**Trail**: Visual effect showing the path a ball has taken over time.
**Interactive Objects**: Special elements beyond basic balls, such as:
- **Spring**: Exerts force based on compression
- **Magnet**: Attracts or repels balls
- **Portal**: Teleports balls between locations
- **Wind Zone**: Applies directional force to balls within area
**Cut**: Opening in a container that allows balls to pass through.
**Collision**: Interaction between two physical objects (balls, containers) resulting in changed
velocities.
## User Account Terms
**Guest Mode**: Limited access without account creation, using local browser storage only.
**About Me**: User-written biography displayed on profile page.
**Social Media Promotion Links**: External platform links (YouTube, Twitter/X, etc.) users can
add to their profiles.
**Achievement**: Unlockable badges earned by completing specific actions or challenges.
## Community Features
**Editor's Picks**: Simulations selected by site administrators for quality or creativity.
**Popular Community Simulations**: User-created simulations that have received high
engagement metrics.
**Gallery**: Browsable collection of community-created simulations.
**Featured Content**: Highlighted simulations displayed prominently on the homepage.
## Achievement System
**Achievement Progress**: Visual representation of completed and remaining achievements.

**Badge**: Visual icon representing a specific achievement.
**Achievement Track**: Related set of achievements in a specific category.
**Unlock**: The action of earning an achievement by meeting its criteria.
