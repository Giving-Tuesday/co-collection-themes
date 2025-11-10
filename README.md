# Co-Collection Themes

A comprehensive React component library providing themed card components and item page layouts for Giving Tuesday's data collection embedding system. This library enables consistent, branded presentation of research data, datasets, reports, and other collection items across multiple platforms and applications.

## 🎯 Purpose

This library serves as the visual foundation for Giving Tuesday's data embedding and collection display system. It provides:

- **Themed Card Components**: Specialized card layouts for different types of content (research papers, datasets, reports, etc.)
- **Item Page Components**: Full-page layouts for detailed item views
- **Reusable UI Components**: Base components like badges, titles, buttons, and content containers
- **Widget System**: Embeddable collection widgets for external sites

## 🏗️ Architecture

### Core Components

The library is built around several key architectural patterns:

**Base Components** (`src/`):

- `BaseCard` - Foundation card component with consistent styling
- `Badge`, `Title`, `ReadMore`, `LinkButton` - Reusable UI elements
- `CardContent` - Flexible content container with positioning
- `Widget` - Embeddable widget wrapper

**Theme System** (`src/themes/`):
The library implements a dynamic theme system where each collection type has its own specialized components:

- `african-giving-traditions/` - Cards and pages for African philanthropy research
- `datamarts/` - IRS Form 990 data collections with file size indicators
- `datasets/` - Research datasets with images and categorization
- `gtrex/` - Giving Tuesday Research Exchange publications
- `gtdc/` - Global Giving Data Collaborative projects
- `posterchild/` - Initiative showcases with thumbnails
- `problems-solutions/` - Problem-solution mapping content
- `viz-database/` - Data visualization collections

**Utility System** (`src/utils/`):

- Theme resolution utilities that map collection names to appropriate components
- Text processing utilities for truncation and formatting
- PropTypes validation helpers

### Component Resolution

The library uses a sophisticated theme resolution system:

```javascript
// Automatically resolves theme name to appropriate component
const CardComponent = getThemeCard('gtrex');
const ItemPageComponent = getThemeItemPage('datasets');
```

Multiple theme names can map to the same component:

```javascript
['giving-lab', 'givinglab', 'gtrex']; // All resolve to GtrexCard
```

## 🚀 Development Setup

### Prerequisites

- Node.js 20+
- npm (not yarn - this project standardizes on npm)

### Installation

```bash
git clone https://github.com/scottanthonymorin/co-collection-themes.git
cd co-collection-themes
npm install
```

### Available Scripts

```bash
# Development
npm run build:watch     # Build in watch mode for active development
npm run storybook      # Launch Storybook development server (http://localhost:6006)

# Building
npm run build          # Production build (outputs to dist/)
npm run clean         # Remove dist/ folder

# Quality Assurance
npm run lint          # ESLint checking
npm run lint:fix      # Auto-fix ESLint issues
npm run format        # Prettier formatting

# Documentation
npm run build:stories # Build static Storybook for deployment
```

### Development Workflow

1. **Component Development**: Use Storybook for isolated component development

   ```bash
   npm run storybook
   ```

2. **Theme Creation**: When adding new collection types:
   - Create theme folder in `src/themes/[theme-name]/`
   - Implement `Card.jsx` and `ItemPage.jsx` components
   - Add theme CSS modules
   - Register in `src/themes/cards.jsx` and `src/themes/item-pages.jsx`
   - Create Storybook stories in `stories/[theme-name]/`

3. **Testing**: Use Storybook stories to verify component behavior across different data scenarios

### Project Structure

```
src/
├── index.jsx                 # Main library exports
├── [BaseComponents]/         # Reusable UI components
├── themes/
│   ├── index.jsx            # Theme system exports
│   ├── cards.jsx            # Card theme registry
│   ├── item-pages.jsx       # Item page theme registry
│   └── [theme-name]/        # Individual theme implementations
│       ├── Card.jsx         # Theme-specific card component
│       ├── ItemPage.jsx     # Theme-specific item page
│       ├── Card.module.css  # Card-specific styles
│       ├── ItemPage.module.css
│       └── theme.module.css # Shared theme variables
├── utils/                   # Helper utilities
└── Widget/                  # Embeddable widget system

stories/                     # Storybook documentation & testing
├── _decorators/            # Storybook layout helpers
├── _mocks/                 # Sample data for development
└── [theme-name]/           # Theme-specific stories
```

## 📦 Deployment & Publishing

### Automated Publishing

The library uses GitHub Actions for automated publishing to GitHub Packages:

**Automatic Release** (Recommended):

1. Create a GitHub release with semantic version tag (e.g., `v0.3.8`)
2. Package is automatically built and published

**Manual Release**:

```bash
# Via GitHub Actions workflow dispatch
# Choose version type: patch, minor, or major

# Or locally (requires npm authentication)
npm run release:patch
npm run release:minor
npm run release:major
```

### Publishing Configuration

- **Registry**: GitHub Packages (`https://npm.pkg.github.com`)
- **Scope**: `@giving-tuesday/co-collection-themes`
- **Access**: Public within Giving Tuesday organization

### Build Output

The build process generates:

- `dist/index.cjs.js` - CommonJS build for Node.js environments
- `dist/index.esm.js` - ES Module build for modern bundlers
- Source maps for both builds
- CSS modules are inlined and scoped

## 🔧 Integration & Usage

### Installation in Consumer Projects

```bash
npm install @giving-tuesday/co-collection-themes
```

### Basic Usage

```jsx
import { getThemeCard, GtrexCard } from '@giving-tuesday/co-collection-themes';

// Dynamic theme resolution
const CardComponent = getThemeCard('gtrex');
<CardComponent item={itemData} />

// Direct component usage
<GtrexCard item={itemData} to="/items/123" />

// Widget embedding
import { Widget } from '@giving-tuesday/co-collection-themes';
<Widget items={collectionItems} widgetTheme="datasets" maxCardsPerRow={3} />
```

### Data Format

Components expect items with this general structure:

```javascript
{
  _id: "unique-identifier",
  title: "Item Title",
  author: ["Author Name"],
  desc: "Item description",
  custom_fields: {
    // Theme-specific fields vary by collection type
    resource_type: "Academic Publication",
    year_published: "2025",
    // ... other theme-specific data
  }
}
```

### Peer Dependencies

Ensure these are installed in consuming applications:

```json
{
  "react": ">=18 <20",
  "react-dom": ">=18 <20",
  "react-icons": ">=4.0.0",
  "react-router-dom": ">=6.0.0"
}
```

## 🛠️ Maintenance

### Adding New Themes

1. **Create Theme Structure**:

   ```bash
   mkdir src/themes/new-theme-name
   ```

2. **Implement Components**:
   - `Card.jsx` - Card layout component
   - `ItemPage.jsx` - Full page layout component
   - `index.jsx` - Theme exports
   - CSS modules for styling

3. **Register Theme**:
   - Add to `src/themes/cards.jsx` cardThemeEntries
   - Add to `src/themes/item-pages.jsx` itemPageThemeEntries

4. **Create Stories**:
   - Add mock data to `stories/_mocks/`
   - Create `stories/theme-name/` directory with stories

5. **Update Documentation**:
   - Add theme description to this README
   - Document any special custom_fields requirements

### Code Quality Standards

- **ESLint**: Enforced with React and import/export rules
- **Prettier**: Consistent code formatting
- **PropTypes**: Runtime type checking for all props
- **CSS Modules**: Scoped styling to prevent conflicts
- **Semantic Versioning**: Follow semver for releases

### Performance Considerations

- CSS modules are extracted and minimized in builds
- Components use React.memo where appropriate
- Large dependency bundles are peer dependencies
- Tree-shaking friendly ES module exports

### Browser Support

- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- ES2022+ syntax (transpiled by consuming applications)
- CSS Grid and Flexbox layouts

## 🔄 Migration Notes

When updating major versions, check:

1. **Theme API Changes**: Component prop interfaces
2. **CSS Variable Updates**: Theme-specific CSS custom properties
3. **Peer Dependency Updates**: React version compatibility
4. **Utility Function Changes**: Theme resolution utility updates

## 📚 Resources

- **Storybook Documentation**: Run `npm run storybook` for interactive component docs
- **GitHub Repository**: https://github.com/scottanthonymorin/co-collection-themes
- **Package Registry**: https://github.com/scottanthonymorin/co-collection-themes/packages
