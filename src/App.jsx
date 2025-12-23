import { useState, useEffect } from 'react'
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Database,
  FileText,
  Video,
  Brain,
  Search,
  MessageSquare,
  Code,
  Clock,
  Target,
  Shield,
  Zap,
  Eye,
  Image as ImageIcon,
  Layers,
  Languages
} from 'lucide-react'

const translations = {
  en: {
    sections: [
      { id: 'problem', title: 'Problem & Overview' },
      { id: 'architecture', title: 'High-Level Architecture' },
      { id: 'components', title: 'Component Deep Dives' },
      { id: 'decisions', title: 'Key Design Decisions' },
      { id: 'scaling', title: 'Global Scale Strategy' },
      { id: 'mvp', title: 'MVP Scope' },
      { id: 'tradeoffs', title: 'Tradeoffs & Risks' },
      { id: 'vision', title: 'Phase 2: Vision Enhancement' },
      { id: 'tech-stack', title: 'Tech Stack & Next Steps' },
      { id: 'demo', title: 'Live Demo' },
    ],
    nav: {
      navigation: 'Navigation',
      hoverComponents: 'Hover over components to see descriptions • Click to view detailed breakdown',
    },
    problem: {
      title: 'Virtual Assistant for Global Manufacturing',
      subtitle: 'Enterprise Q&A System Architecture for Every Factory Worldwide',
      scale: 'Scale Target: 10,000+ factories, 1M+ machinists, 10M queries/day',
      cost: 'Cost Constraint: Must achieve <$0.01 per query to be economically viable',
    },
    common: {
      next: 'Next',
      previous: 'Previous',
      clickToSeeDetails: 'Click to see details →',
    }
  },
  fr: {
    sections: [
      { id: 'problem', title: 'Problème & Vue d\'ensemble' },
      { id: 'architecture', title: 'Architecture de Haut Niveau' },
      { id: 'components', title: 'Analyse Approfondie des Composants' },
      { id: 'decisions', title: 'Décisions Clés de Conception' },
      { id: 'scaling', title: 'Stratégie d\'Échelle Mondiale' },
      { id: 'mvp', title: 'Portée du MVP' },
      { id: 'tradeoffs', title: 'Compromis & Risques' },
      { id: 'vision', title: 'Phase 2: Amélioration Visuelle' },
      { id: 'tech-stack', title: 'Stack Technique & Prochaines Étapes' },
      { id: 'demo', title: 'Démo en Direct' },
    ],
    nav: {
      navigation: 'Navigation',
      hoverComponents: 'Survolez les composants pour voir les descriptions • Cliquez pour voir les détails',
    },
    problem: {
      title: 'Assistant Virtuel pour la Fabrication Mondiale',
      subtitle: 'Architecture de Système Q&A d\'Entreprise pour Chaque Usine dans le Monde',
      scale: 'Objectif d\'Échelle: 10 000+ usines, 1M+ machinistes, 10M requêtes/jour',
      cost: 'Contrainte de Coût: Doit atteindre <0,01$ par requête pour être économiquement viable',
    },
    common: {
      next: 'Suivant',
      previous: 'Précédent',
      clickToSeeDetails: 'Cliquez pour voir les détails →',
    }
  }
}

const sections = translations.en.sections

const glossary = {
  'RAG': 'Retrieval-Augmented Generation: A technique that combines information retrieval with language models to generate answers from external knowledge sources.',
  'pgvector': 'PostgreSQL extension that adds vector similarity search capabilities, allowing efficient storage and querying of embedding vectors.',
  'embedding': 'A numerical representation of text (or other data) as a vector in high-dimensional space, capturing semantic meaning for similarity comparisons.',
  'embeddings': 'A numerical representation of text (or other data) as a vector in high-dimensional space, capturing semantic meaning for similarity comparisons.',
  'vector': 'A mathematical representation of data as an array of numbers, used in machine learning to represent text, images, or other data.',
  'semantic': 'Relating to meaning in language. Semantic search understands the meaning and context of queries, not just keyword matching.',
  'semantic search': 'Search method that understands the meaning and context of queries, not just keyword matching, using vector similarity.',
  'BM25': 'Best Matching 25: A ranking function used in information retrieval that scores documents based on query terms, considering term frequency and document length.',
  'HNSW': 'Hierarchical Navigable Small World: A graph-based algorithm for fast approximate nearest neighbor search in high-dimensional vector spaces.',
  'chunking': 'The process of breaking down large documents into smaller, manageable pieces (chunks) for processing and embedding generation.',
  'cosine similarity': 'A measure of similarity between two vectors, calculated as the cosine of the angle between them. Range: -1 to 1, where 1 means identical.',
  'LLM': 'Large Language Model: AI models like GPT-4 that can understand and generate human-like text based on training data.',
  'hybrid search': 'Combining multiple search methods (e.g., semantic vector search + keyword search) to improve retrieval quality.',
  'top-k': 'Retrieving the k most relevant results (e.g., top-5 most similar chunks) from a search operation.',
  'Whisper': 'OpenAI\'s automatic speech recognition model that converts audio/video to text with high accuracy.',
  'CLIP': 'Contrastive Language-Image Pre-training: A model that learns to understand images and text together, enabling multimodal search.',
  'multimodal': 'Systems that can process and understand multiple types of data (text, images, video) simultaneously.',
  'Multimodal': 'Systems that can process and understand multiple types of data (text, images, video) simultaneously.',
  'fine-tuning': 'Training a pre-trained model on specific data to adapt it for a particular task or domain.',
  'stateless': 'An API or system that doesn\'t store session information between requests - each request is independent.',
  'Stateless': 'An API or system that doesn\'t store session information between requests - each request is independent.',
  'stateful': 'An API or system that maintains session state or conversation context across multiple requests.',
  'PostgreSQL': 'Open-source relational database management system. With pgvector extension, it can store and query vector embeddings efficiently.',
  'Redis': 'In-memory data structure store used as a database, cache, and message broker. Extremely fast for caching with sub-millisecond latency.',
  'Kubernetes': 'Container orchestration platform for automating deployment, scaling, and management of containerized applications.',
  'API': 'Application Programming Interface: A set of protocols and tools for building software applications that communicate with each other.',
  'JSON': 'JavaScript Object Notation: A lightweight data interchange format used for transmitting data between a server and web application.',
  'OpenAI': 'AI research company providing large language models like GPT-4, GPT-4o, and text-embedding models through API services.',
  'Anthropic': 'AI safety company that developed Claude, a large language model competitor to GPT-4.',
  'Claude': 'Large language model developed by Anthropic, known for strong reasoning and safety features.',
  'GPT-4': 'OpenAI\'s advanced large language model capable of understanding and generating human-like text with high accuracy.',
  'GPT-4o': 'OpenAI\'s optimized version of GPT-4 with improved performance and lower latency.',
  'GPT-4o-mini': 'OpenAI\'s smaller, faster, and cheaper version of GPT-4o for simpler queries.',
  'FFmpeg': 'Open-source multimedia framework for processing video and audio files, including extraction, conversion, and encoding.',
  'OpenCV': 'Open Source Computer Vision Library: A library of programming functions for real-time computer vision and image processing.',
  'NLTK': 'Natural Language Toolkit: A Python library for working with human language data, including tokenization and sentence splitting.',
  'spaCy': 'Advanced natural language processing library for Python, providing fast and accurate tokenization, parsing, and entity recognition.',
  'PyPDF2': 'Python library for reading and manipulating PDF files, including text extraction and metadata access.',
  'pdfplumber': 'Python library for extracting text and tables from PDF files with better accuracy than PyPDF2.',
  'tiktoken': 'Fast BPE tokenizer used by OpenAI for counting tokens in text, ensuring accurate token limits for API calls.',
  'SHA-256': 'Secure Hash Algorithm 256-bit: A cryptographic hash function used for generating unique identifiers and cache keys.',
  'Gzip': 'Compression algorithm that reduces file size by removing redundancy, commonly used for compressing cache values.',
  'LRU': 'Least Recently Used: A cache eviction policy that removes the least recently accessed items when the cache is full.',
  'TTL': 'Time To Live: The duration that cached data remains valid before expiring and being refreshed.',
  'asyncio': 'Python library for writing concurrent code using async/await syntax, enabling parallel execution of I/O operations.',
  'Promise.all()': 'JavaScript method that executes multiple asynchronous operations in parallel and waits for all to complete.',
  'TF-IDF': 'Term Frequency-Inverse Document Frequency: A statistical measure used to evaluate word importance in documents.',
  'Jaccard similarity': 'A measure of similarity between two sets, calculated as the size of intersection divided by the size of union.',
  'reciprocal rank fusion': 'A method for combining multiple ranked lists by summing reciprocal ranks from each list.',
  'OCR': 'Optical Character Recognition: Technology that converts images of text into machine-readable text.',
  'SRT': 'SubRip Subtitle: A file format for storing subtitles with timestamps, commonly used for video transcripts.',
  'VTT': 'WebVTT: Web Video Text Tracks format for displaying timed text tracks in HTML5 video players.',
  'GPU': 'Graphics Processing Unit: Specialized processor optimized for parallel computations, used for AI model inference and training.',
  'CPU': 'Central Processing Unit: General-purpose processor that executes instructions, used for lighter AI workloads.',
  'GIN': 'Generalized Inverted Index: A PostgreSQL index type optimized for full-text search and array operations.',
  'tsvector': 'PostgreSQL data type that stores preprocessed text for full-text search, with words normalized and stemmed.',
  'tsquery': 'PostgreSQL data type representing a full-text search query with boolean operators (AND, OR, NOT).',
  'JSONB': 'PostgreSQL data type for storing JSON data in binary format, allowing efficient querying and indexing.',
  'UUID': 'Universally Unique Identifier: A 128-bit identifier that is unique across space and time.',
  'VARCHAR': 'Variable Character: A database data type for storing variable-length character strings.',
  'INTERVAL': 'PostgreSQL data type for storing time intervals, useful for video timestamps.',
  'Vite': 'Next-generation frontend build tool that provides fast development server and optimized production builds.',
  'Tailwind CSS': 'Utility-first CSS framework for rapidly building custom user interfaces with pre-built utility classes.',
  'React': 'JavaScript library for building user interfaces, using a component-based architecture and virtual DOM.',
  'Markdown': 'Lightweight markup language for formatting text, commonly used for documentation and formatted responses.',
  'URL': 'Uniform Resource Locator: The address of a resource on the internet, used for linking to documents and media.',
  'Server-Sent Events': 'A web standard allowing a server to push updates to a client over HTTP, used for streaming responses.',
  'REST': 'Representational State Transfer: An architectural style for designing web services using standard HTTP methods.',
  'fetch': 'JavaScript API for making HTTP requests, the modern replacement for XMLHttpRequest.',
  'axios': 'Popular JavaScript library for making HTTP requests with support for promises and interceptors.',
  'PgBouncer': 'Lightweight connection pooler for PostgreSQL that reduces connection overhead and improves performance.',
  'ElastiCache': 'AWS managed service for Redis and Memcached, providing in-memory caching with high availability.',
  'Cloudflare': 'Content delivery network and cloud services provider, offering CDN, DDoS protection, and edge computing.',
  'S3': 'Amazon Simple Storage Service: Object storage service for storing and retrieving any amount of data.',
  'Glacier': 'AWS archival storage service for long-term data retention with lower costs but retrieval delays.',
  'RDS': 'Amazon Relational Database Service: Managed database service for PostgreSQL, MySQL, and other databases.',
  'Cloud SQL': 'Google Cloud managed database service for MySQL, PostgreSQL, and SQL Server.',
  'EKS': 'Amazon Elastic Kubernetes Service: Managed Kubernetes service on AWS.',
  'GKE': 'Google Kubernetes Engine: Managed Kubernetes service on Google Cloud Platform.',
  'AKS': 'Azure Kubernetes Service: Managed Kubernetes service on Microsoft Azure.',
  'Qdrant': 'Vector database optimized for similarity search, designed for production use with high performance.',
  'Weaviate': 'Open-source vector database with built-in machine learning capabilities and GraphQL API.',
  'Pinecone': 'Managed vector database service for storing and querying embeddings at scale.',
  'Lambda': 'AWS serverless compute service that runs code in response to events without managing servers.',
  'Workers': 'Cloudflare Workers: Serverless platform for running JavaScript at the edge with global distribution.',
  'SQS': 'Amazon Simple Queue Service: Message queuing service for decoupling and scaling microservices.',
  'Kafka': 'Distributed event streaming platform for building real-time data pipelines and streaming applications.',
  'EC2': 'Amazon Elastic Compute Cloud: Virtual servers in the cloud for running applications and workloads.',
  'all-MiniLM-L6-v2': 'Lightweight sentence transformer model that generates 384-dimensional embeddings, 80% as accurate as OpenAI but much faster.',
  'Llama': 'Open-source large language model developed by Meta, available for self-hosting and fine-tuning.',
  'TPU': 'Tensor Processing Unit: Google\'s custom chip designed specifically for machine learning workloads.',
  'SPA': 'Single Page Application: A web application that loads a single HTML page and dynamically updates content.',
  'React Hooks': 'Functions that let you use state and other React features in functional components (useState, useEffect, etc.).',
  'useState': 'React Hook that adds state management to functional components.',
  'useEffect': 'React Hook that performs side effects in functional components, like data fetching or DOM updates.',
}

function TermHighlight({ term, children }) {
  const [isHovered, setIsHovered] = useState(false)
  const termKey = (term || children || '').toString().trim()
  const definition = glossary[termKey] || glossary[termKey.toLowerCase()]
  const termToShow = children || term

  if (!definition) {
    return <span>{termToShow}</span>
  }

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="text-primary-600 font-semibold underline decoration-dotted decoration-primary-400 cursor-help hover:text-primary-700 transition-colors">
        {termToShow}
      </span>
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl z-50 animate-fadeIn pointer-events-none">
          <div className="font-bold text-primary-300 mb-1">{termToShow}</div>
          <div className="leading-relaxed">{definition}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </span>
  )
}

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [expandedDecisions, setExpandedDecisions] = useState({})
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [language, setLanguage] = useState('en')
  
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }
  
  const currentSections = translations[language].sections

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' && currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1)
      } else if (e.key === 'ArrowLeft' && currentSection > 0) {
        setCurrentSection(currentSection - 1)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSection])

  const goToSection = (index, componentId = null) => {
    setCurrentSection(index)
    setSelectedComponent(componentId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (componentId) {
      setTimeout(() => {
        const element = document.getElementById(`component-${componentId}`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }

  const nextSection = () => {
    if (currentSection < currentSections.length - 1) {
      goToSection(currentSection + 1)
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      goToSection(currentSection - 1)
    }
  }

  const toggleDecision = (id) => {
    setExpandedDecisions(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-primary-600 transition-all duration-500"
          style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
        />
      </div>

      {/* Language Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
          className="bg-white shadow-lg rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-50 transition-colors border border-gray-200"
          title={language === 'en' ? 'Switch to French' : 'Passer en anglais'}
        >
          <Languages className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">{language === 'en' ? 'FR' : 'EN'}</span>
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-40 pt-12 overflow-y-auto">
        <div className="px-4 py-2">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            {t('nav.navigation')}
          </h2>
          <nav className="space-y-1">
            {currentSections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => goToSection(index)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                  currentSection === index
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-sm font-medium">{section.title}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        <div className="max-w-6xl mx-auto px-8 py-12">
          {/* Section 1: Problem & Overview */}
          {currentSection === 0 && (
            <div className="section-transition animate-fadeIn">
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">
                  {t('problem.title')}
                </h1>
                <p className="text-xl text-gray-600">
                  {t('problem.subtitle')}
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-12 mb-8">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Problem Statement</h2>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Machinists in factories worldwide need instant access to technical information from machine-specific 
                    documentation and training materials. Traditional search through <TermHighlight>PDFs</TermHighlight> and video tutorials is 
                    time-consuming, inefficient, and doesn't scale across thousands of factories with different machines, 
                    languages, and compliance requirements.
                  </p>
                  
                  <div className="bg-primary-50 border-l-4 border-primary-600 p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Vision: Every Factory in the World</h3>
                    <p className="text-gray-700 mb-4">
                      A <TermHighlight>multi-tenant</TermHighlight>, globally-distributed <TermHighlight>Q&A</TermHighlight> system that enables machinists to ask <TermHighlight>natural language</TermHighlight> 
                      questions and receive accurate answers sourced from their factory's specific documentation:
                    </p>
                    <ul className="space-y-2 text-gray-700 mb-4">
                      <li className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary-600" />
                        <span>Machine-specific PDF manuals (unique per factory)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Video className="w-5 h-5 text-primary-600" />
                        <span>Training videos and procedural recordings</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Database className="w-5 h-5 text-primary-600" />
                        <span>Multi-tenant architecture supporting 10,000+ factories</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-primary-600" />
                        <span>Global scale: 1M+ users, 10M+ queries/day</span>
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Target className="w-6 h-6 text-primary-600" />
                        <h4 className="text-lg font-semibold text-gray-900">Scale Target</h4>
                      </div>
                      <p className="text-2xl font-bold text-primary-600">10,000+</p>
                      <p className="text-sm text-gray-600 mt-2">Factories worldwide</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Zap className="w-6 h-6 text-primary-600" />
                        <h4 className="text-lg font-semibold text-gray-900">Users</h4>
                      </div>
                      <p className="text-2xl font-bold text-primary-600">1M+</p>
                      <p className="text-sm text-gray-600 mt-2">Machinists globally</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <MessageSquare className="w-6 h-6 text-primary-600" />
                        <h4 className="text-lg font-semibold text-gray-900">Query Volume</h4>
                      </div>
                      <p className="text-2xl font-bold text-primary-600">10M/day</p>
                      <p className="text-sm text-gray-600 mt-2">~115 queries/second</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Critical Constraint</h3>
                    <p className="text-gray-700">
                      <strong>Cost viability at scale:</strong> At 10M queries/day, unoptimized <TermHighlight>LLM</TermHighlight> costs would be 
                      $500K-$1M per day. Architecture must achieve <strong>&lt;$0.01 per query</strong> through aggressive 
                      caching, smart routing, and <TermHighlight>hybrid search</TermHighlight> strategies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: High-Level Architecture */}
          {currentSection === 1 && (
            <div className="section-transition animate-fadeIn">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">{currentSections[1].title}</h2>
              <p className="text-gray-600 mb-6 text-center">{t('nav.hoverComponents')}</p>
              
              <div className="bg-white rounded-2xl shadow-xl p-12">
                <div className="relative">
                  {/* Flow: Top to Bottom */}
                  
                  {/* Row 1: User Interface */}
                  <div className="flex justify-center mb-6">
                    <InteractiveArchitectureComponent
                      language={language}
                      icon={MessageSquare}
                      title="User Interface"
                      description="Web-based chat interface"
                      details="Users submit questions through a React-based web interface. Queries are sent to the backend API for processing."
                      color="bg-blue-500"
                      componentId="user-interface"
                      onClick={() => goToSection(2, 'user-interface')}
                    />
                  </div>

                  {/* Arrow 1: UI → Cache Check */}
                  <div className="flex justify-center mb-6">
                    <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-90" />
                  </div>

                  {/* Row 2: Multi-Level Cache */}
                  <div className="flex justify-center mb-6">
                    <InteractiveArchitectureComponent
                      language={language}
                      icon={Zap}
                      title="Multi-Level Cache"
                      description="Response caching layers"
                      details="Layer 1: Exact query match (Redis). Layer 2: Semantic similarity cache (vector). Layer 3: Pre-computed FAQ. Target: 70-90% cache hit rate to reduce LLM costs by 70-90%."
                      color="bg-yellow-500"
                      componentId="caching-layer"
                      onClick={() => goToSection(2, 'caching-layer')}
                    />
                  </div>

                  {/* Arrow 2: Cache → Query Processing (if cache miss) */}
                  <div className="flex justify-center mb-6">
                    <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-90" />
                    <span className="text-xs text-gray-500 ml-2">cache miss</span>
                  </div>

                  {/* Row 3: Query Processing */}
                  <div className="flex justify-center mb-6">
                    <InteractiveArchitectureComponent
                      language={language}
                      icon={Search}
                      title="Query Processing Layer"
                      description="Classification & routing"
                      details="Classifies query complexity (simple vs complex), routes to appropriate model tier. Generates embeddings only if needed (after keyword search fails). Extracts key terms for hybrid search."
                      color="bg-purple-500"
                      componentId="query-processing"
                      onClick={() => goToSection(2, 'query-processing')}
                    />
                  </div>

                  {/* Arrow 3: Query Processing → Retrieval */}
                  <div className="flex justify-center mb-6">
                    <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-90" />
                  </div>

                  {/* Row 4: Retrieval Orchestration */}
                  <div className="flex justify-center mb-6">
                    <InteractiveArchitectureComponent
                      language={language}
                      icon={Zap}
                      title="Retrieval Orchestration"
                      description="Hybrid search strategy"
                      details="First pass: Keyword search (FREE, catches 40%). Second pass: Semantic search (if keyword fails). Combines results and ranks. Selects top-k relevant chunks from tenant-specific knowledge bases."
                      color="bg-orange-500"
                      componentId="retrieval-orchestration"
                      onClick={() => goToSection(2, 'retrieval-orchestration')}
                    />
                  </div>

                  {/* Arrows 3: Retrieval → Knowledge Bases (diagonal) */}
                  <div className="flex justify-center gap-20 mb-4">
                    <div className="flex flex-col items-center">
                      <ArrowRight className="w-6 h-6 text-gray-400 transform -rotate-45" />
                      <span className="text-xs text-gray-500 mt-1">queries</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-45" />
                      <span className="text-xs text-gray-500 mt-1">queries</span>
                    </div>
                  </div>

                  {/* Row 4: Knowledge Bases (side by side) */}
                  <div className="grid grid-cols-2 gap-8 mb-4">
                    <div className="flex flex-col items-center">
                      <InteractiveArchitectureComponent
                        language={language}
                        icon={FileText}
                        title="Document Knowledge Base"
                        description="PDF embeddings"
                        details="PostgreSQL + pgvector stores PDF chunks with embeddings. Each chunk includes: text content, embedding vector, source document, page number, and metadata."
                        color="bg-green-500"
                        componentId="document-knowledge-base"
                        onClick={() => goToSection(2, 'document-knowledge-base')}
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <InteractiveArchitectureComponent
                        language={language}
                        icon={Video}
                        title="Video Knowledge Base"
                        description="Video transcripts"
                        details="Stores video transcript chunks with embeddings. Each chunk includes: transcript text, embedding vector, video ID, start/end timestamps, and scene descriptions."
                        color="bg-red-500"
                        componentId="video-knowledge-base"
                        onClick={() => goToSection(2, 'video-knowledge-base')}
                      />
                    </div>
                  </div>

                  {/* Arrows 4: Knowledge Bases → Retrieval (back up) */}
                  <div className="flex justify-center gap-20 mb-6">
                    <div className="flex flex-col items-center">
                      <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-[135deg]" />
                      <span className="text-xs text-gray-500 mt-1">results</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <ArrowRight className="w-6 h-6 text-gray-400 transform -rotate-[135deg]" />
                      <span className="text-xs text-gray-500 mt-1">results</span>
                    </div>
                  </div>

                  {/* Arrow 5: Retrieval → Response Generation (downward flow) */}
                  <div className="flex justify-center mb-6">
                    <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-90" />
                  </div>

                  {/* Row 5: Response Generation */}
                  <div className="flex justify-center">
                    <InteractiveArchitectureComponent
                      language={language}
                      icon={Brain}
                      title="Response Generation"
                      description="LLM synthesis & formatting"
                      details="Uses GPT-4 to synthesize retrieved chunks into coherent answers. Adds source citations (page numbers for PDFs, timestamps for videos). Formats response for user display."
                      color="bg-indigo-500"
                      componentId="response-generation"
                      onClick={() => goToSection(2, 'response-generation')}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Component Deep Dives */}
          {currentSection === 2 && (
            <div className="section-transition animate-fadeIn">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Component Deep Dives</h2>
              <p className="text-gray-600 mb-8">Click components in the architecture diagram to jump to their detailed breakdown</p>
              
              <div className="space-y-8">
                {/* User Interface */}
                <div id="component-user-interface" className={`bg-white rounded-xl shadow-lg p-8 transition-all duration-300 ${selectedComponent === 'user-interface' ? 'ring-4 ring-primary-500 ring-offset-2' : ''}`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <MessageSquare className="w-7 h-7 text-blue-600" />
                    User Interface
                  </h3>
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    This is the web page where machinists type their questions and see the answers. It's designed to be simple and fast, so users can quickly find the information they need without any technical knowledge.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Example Use Case</h4>
                    <p className="text-gray-700 text-sm">
                      A machinist working on a coffee machine needs to know the optimal temperature for espresso extraction. They open the web interface, type "What's the best temperature for pulling espresso shots?" and receive a formatted answer with a link to page 23 of the machine manual within 2 seconds.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Frontend Stack</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><TermHighlight>React</TermHighlight>-based single-page application (<TermHighlight>SPA</TermHighlight>)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Built with <TermHighlight>Vite</TermHighlight> for fast development and optimized builds</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><TermHighlight>Tailwind CSS</TermHighlight> for responsive, utility-first styling</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>State management with <TermHighlight>React Hooks</TermHighlight> (<TermHighlight>useState</TermHighlight>, <TermHighlight>useEffect</TermHighlight>)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Real-time query submission via <TermHighlight>REST API</TermHighlight> with <TermHighlight>fetch</TermHighlight> or <TermHighlight>axios</TermHighlight></span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">User Experience Features</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Natural language query input with character limits (max 2000 chars)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Formatted responses with <TermHighlight>Markdown</TermHighlight> support for code blocks and lists</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Clickable links to source pages/timestamps with deep linking</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Query refinement suggestions based on common patterns</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Streaming responses for long answers (optional, using <TermHighlight>Server-Sent Events</TermHighlight>)</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Performance & Optimization</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Lazy loading of components and media files</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Debounced input for query suggestions (300ms delay)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Optimistic UI updates with rollback on errors</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Client-side caching of recent queries and responses</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Error boundaries for graceful failure handling</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-gray-900 mb-2">API Integration Details</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span><strong>Endpoint:</strong> <code className="bg-gray-100 px-2 py-1 rounded">POST /api/v1/query</code> with <TermHighlight>JSON</TermHighlight> payload</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span><strong>Request format:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{"{query: string, tenant_id: string}"}</code></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span><strong>Response format:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{"{answer: string, sources: Array, confidence: number}"}</code></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span><strong>Timeout:</strong> 30 seconds with exponential backoff retry logic</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Multi-Level Cache */}
                <div id="component-caching-layer" className={`bg-white rounded-xl shadow-lg p-8 transition-all duration-300 ${selectedComponent === 'caching-layer' ? 'ring-4 ring-primary-500 ring-offset-2' : ''}`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Zap className="w-7 h-7 text-yellow-600" />
                    Multi-Level Cache
                  </h3>
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    This is like a smart memory system that remembers answers to questions that have been asked before. If someone asks the same question again, the system can give the answer instantly without having to search through all the documents, which saves time and money.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Example Use Case</h4>
                    <p className="text-gray-700 text-sm">
                      At 8 AM, a machinist asks "How do I clean the group head?" The system processes this and stores the answer. At 2 PM, another machinist asks the exact same question. Instead of searching documents and calling the <TermHighlight>LLM</TermHighlight>, the cache returns the answer in under 10 milliseconds, saving $0.05 in <TermHighlight>LLM</TermHighlight> costs.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Layer 1: Exact Match Cache</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><TermHighlight>Redis</TermHighlight> in-memory cache with <TermHighlight>SHA-256</TermHighlight> hash key: <code className="bg-gray-100 px-1 rounded">hash(query + tenant_id)</code></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><TermHighlight>TTL</TermHighlight> (Time-To-Live): 24 hours with automatic expiration</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Sub-10ms lookup latency for cached responses</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Saves: 100% <TermHighlight>LLM</TermHighlight> cost for exact repeat queries</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Cache invalidation on document updates via event-driven triggers</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Layer 2: Semantic Cache</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><TermHighlight>Vector similarity</TermHighlight> search on past query <TermHighlight>embeddings</TermHighlight> stored in <TermHighlight>pgvector</TermHighlight></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>If <TermHighlight>cosine similarity</TermHighlight> &gt;0.95, return cached response (no <TermHighlight>LLM</TermHighlight> call)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Uses <TermHighlight>HNSW</TermHighlight> index for fast approximate nearest neighbor search</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Saves: 60-70% <TermHighlight>LLM</TermHighlight> cost for semantically similar queries</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Cache size: ~20GB per region (8M queries × 2KB response)</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Layer 3: Pre-computed FAQ</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>100 most common questions per machine type, pre-generated during ingestion</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Updated monthly or on document changes via background jobs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Stored in <TermHighlight>PostgreSQL</TermHighlight> with full-text search index for fast lookup</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Saves: 30-40% of queries never hit <TermHighlight>LLM</TermHighlight> or retrieval</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Cost: ~$0.10 per factory/month for storage</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                      <h4 className="font-semibold text-gray-900 mb-2">Cache Eviction Strategy</h4>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-600 mt-1">•</span>
                          <span><TermHighlight>LRU</TermHighlight> (Least Recently Used) eviction for <TermHighlight>Redis</TermHighlight> when memory limit reached</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-600 mt-1">•</span>
                          <span>Compression: <TermHighlight>Gzip</TermHighlight> cache values (50% size reduction)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-600 mt-1">•</span>
                          <span>Cache warming: Pre-populate for new tenants using cross-tenant common queries</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                      <h4 className="font-semibold text-gray-900 mb-2">Performance Metrics</h4>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>Target: <strong>70-90% cache hit rate</strong> across all layers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>Reduces <TermHighlight>LLM</TermHighlight> costs by <strong>70-90%</strong> at scale</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>Average response time: 100ms (cached) vs 2s (uncached)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Query Processing Layer */}
                <div id="component-query-processing" className={`bg-white rounded-xl shadow-lg p-8 transition-all duration-300 ${selectedComponent === 'query-processing' ? 'ring-4 ring-primary-500 ring-offset-2' : ''}`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Search className="w-7 h-7 text-purple-600" />
                    Query Processing Layer
                  </h3>
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    When a user asks a question, this part figures out what kind of question it is and how to best answer it. It decides whether the question is simple or complex, which helps the system respond faster and more cost-effectively.
                  </p>
                  <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Example Use Case</h4>
                    <p className="text-gray-700 text-sm">
                      A machinist asks "What's the warranty period for the Model X-2000?" The system classifies this as a simple query (factual lookup, short, single answer). It routes to <TermHighlight>GPT-4o-mini</TermHighlight> ($0.15/1M tokens) instead of <TermHighlight>GPT-4o</TermHighlight> ($5/1M tokens), saving 97% on costs while still providing an accurate answer in 50ms.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Query Classification Algorithm</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Classify complexity: Simple (70%) vs Complex (30%) using rule-based heuristics</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><strong>Simple indicators:</strong> Factual lookup, single-source, short queries (&lt;50 words)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><strong>Complex indicators:</strong> Multi-step reasoning, ambiguous terms, "how to" or "why" questions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Uses keyword matching and query length analysis for fast classification (&lt;10ms)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Route to appropriate <TermHighlight>LLM</TermHighlight> tier based on classification</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Embedding Generation</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Only if keyword search fails (cost optimization - saves 40% of embedding calls)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Convert query to <TermHighlight>vector</TermHighlight> using <TermHighlight>OpenAI text-embedding-3-small</TermHighlight> (1536 dims) or self-hosted <TermHighlight>all-MiniLM-L6-v2</TermHighlight> (384 dims)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Same <TermHighlight>embedding</TermHighlight> model as document chunks for <TermHighlight>cosine similarity</TermHighlight> compatibility</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Normalize <TermHighlight>vectors</TermHighlight> to unit length for efficient <TermHighlight>cosine similarity</TermHighlight> computation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Batch processing for multiple queries (up to 100 per request) to reduce API calls</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Model Routing & Cost Optimization</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><strong>Simple queries:</strong> <TermHighlight>GPT-4o-mini</TermHighlight> ($0.15/1M tokens, ~50ms latency)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><strong>Complex queries:</strong> <TermHighlight>GPT-4o</TermHighlight> ($5.00/1M tokens, ~200ms latency)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Savings: 30-50% on <TermHighlight>LLM</TermHighlight> costs through intelligent routing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Fallback to <TermHighlight>GPT-4o</TermHighlight> if <TermHighlight>GPT-4o-mini</TermHighlight> confidence is low</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Term Extraction & Preprocessing</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span><strong>Tokenization:</strong> Split query into tokens using <TermHighlight>tiktoken</TermHighlight> or <TermHighlight>spaCy</TermHighlight> for accurate token counting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span><strong>Stop word removal:</strong> Filter common words ("the", "is", "a") for keyword search efficiency</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span><strong>Stemming/Lemmatization:</strong> Normalize words to root forms for better keyword matching</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span><strong>Entity extraction:</strong> Identify model numbers, part names, and technical terms for exact matching</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Retrieval Orchestration */}
                <div id="component-retrieval-orchestration" className={`bg-white rounded-xl shadow-lg p-8 transition-all duration-300 ${selectedComponent === 'retrieval-orchestration' ? 'ring-4 ring-primary-500 ring-offset-2' : ''}`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Brain className="w-7 h-7 text-indigo-600" />
                    Retrieval Orchestration
                  </h3>
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    This component is responsible for finding the right information from all the documents and videos. It uses two different search methods to make sure it finds the most relevant information, whether the user asks using exact technical terms or in everyday language.
                  </p>
                  <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Example Use Case</h4>
                    <p className="text-gray-700 text-sm">
                      A machinist asks "How do I fix a leaky steam wand?" The system first tries keyword search and finds "steam wand" in a PDF manual on page 45. However, the keyword search doesn't find "leaky" or "fix" matches. So it generates an <TermHighlight>embedding</TermHighlight> and performs <TermHighlight>semantic search</TermHighlight>, finding a video transcript chunk at 12:34 that says "troubleshooting steam wand leaks." The system combines both results, ranks them, and returns the top 3 most relevant chunks.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Hybrid Search Strategy (Cost-Optimized)</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><strong>First Pass:</strong> <TermHighlight>PostgreSQL</TermHighlight> full-text search using <TermHighlight>tsvector</TermHighlight> and <TermHighlight>tsquery</TermHighlight> (FREE). Catches 40% of queries with exact model numbers and part names.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><strong>Second Pass:</strong> <TermHighlight>Semantic search</TermHighlight> (if keyword fails) - <TermHighlight>cosine similarity</TermHighlight> on <TermHighlight>embeddings</TermHighlight> using <TermHighlight>pgvector</TermHighlight></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Weighted combination: <code className="bg-gray-100 px-1 rounded">score = 0.3 × keyword_score + 0.7 × semantic_score</code> when both used</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Query tenant-specific Document and Video knowledge bases in parallel using <TermHighlight>asyncio</TermHighlight> or <TermHighlight>Promise.all()</TermHighlight></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Uses <TermHighlight>BM25</TermHighlight> algorithm for keyword ranking (better than simple <TermHighlight>TF-IDF</TermHighlight>)</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Result Ranking & Selection</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Merge results from both knowledge bases using weighted <TermHighlight>reciprocal rank fusion</TermHighlight> (RRF)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Deduplicate overlapping chunks using <TermHighlight>Jaccard similarity</TermHighlight> on text content</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Select <TermHighlight>top-k</TermHighlight> most relevant chunks (typically 3-5) using <TermHighlight>max heap</TermHighlight> algorithm</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Apply relevance threshold (0.7 for <TermHighlight>cosine similarity</TermHighlight>) to filter low-quality matches</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Diversity re-ranking: Ensure chunks come from different documents/sections for better coverage</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-500">
                    <h4 className="font-semibold text-gray-900 mb-2">Parallel Query Execution</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span><strong>Concurrent queries:</strong> Execute keyword and semantic searches in parallel using <TermHighlight>asyncio</TermHighlight> or worker threads</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span><strong>Timeout handling:</strong> 2-second timeout per search pass, return best results available</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span><strong>Connection pooling:</strong> Reuse <TermHighlight>PostgreSQL</TermHighlight> connections via <TermHighlight>PgBouncer</TermHighlight> to avoid connection overhead</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span><strong>Performance:</strong> Average retrieval time: 150ms (keyword) + 200ms (semantic) = 350ms total</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Document Knowledge Base */}
                <div id="component-document-knowledge-base" className={`bg-white rounded-xl shadow-lg p-8 transition-all duration-300 ${selectedComponent === 'document-knowledge-base' ? 'ring-4 ring-primary-500 ring-offset-2' : ''}`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <FileText className="w-7 h-7 text-green-600" />
                    Tenant Document Knowledge Base
                  </h3>
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    This is where all the PDF manuals and documents for each factory are stored and organized. The system breaks down these documents into smaller pieces and makes them searchable, so when someone asks a question, it can quickly find the exact page or section that has the answer.
                  </p>
                  <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Example Use Case</h4>
                    <p className="text-gray-700 text-sm">
                      Factory A uploads a 200-page PDF manual for their espresso machine model. The system splits it into 500 chunks of ~400 words each, generates <TermHighlight>embeddings</TermHighlight> for each chunk, and stores them in <TermHighlight>PostgreSQL</TermHighlight> with <TermHighlight>pgvector</TermHighlight>. When a machinist asks "What's the recommended water pressure?", the system searches these <TermHighlight>embeddings</TermHighlight> and finds chunk #342 from page 87, which contains the exact answer: "Optimal water pressure: 9 bar."
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Multi-Tenant Storage</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Database-per-tenant for large factories (&gt;100 users)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Shared multi-tenant DB for small factories</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>PostgreSQL + <TermHighlight>pgvector</TermHighlight> per tenant</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Indexed with <TermHighlight>HNSW</TermHighlight> for fast similarity search</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Regional deployment for data residency (EU, China)</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Data Schema & Indexing</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><code className="bg-gray-100 px-1 rounded">chunk_id (UUID)</code>, <code className="bg-gray-100 px-1 rounded">text_content (TEXT)</code>, <code className="bg-gray-100 px-1 rounded">embedding_vector (vector(1536))</code></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><code className="bg-gray-100 px-1 rounded">source_document (VARCHAR)</code>, <code className="bg-gray-100 px-1 rounded">page_number (INT)</code>, <code className="bg-gray-100 px-1 rounded">chunk_index (INT)</code></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><code className="bg-gray-100 px-1 rounded">metadata (JSONB)</code>: document_type, created_at, section_title, tenant_id</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><TermHighlight>HNSW</TermHighlight> index on <code className="bg-gray-100 px-1 rounded">embedding_vector</code> with <code className="bg-gray-100 px-1 rounded">m=16, ef_construction=64</code> for fast similarity search</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><TermHighlight>GIN</TermHighlight> index on <code className="bg-gray-100 px-1 rounded">text_content</code> using <TermHighlight>tsvector</TermHighlight> for full-text search</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Ingestion Process</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><strong>Step 1:</strong> PDF text extraction using <TermHighlight>PyPDF2</TermHighlight> or <TermHighlight>pdfplumber</TermHighlight> (preserves structure, tables, headers)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><strong>Step 2:</strong> <TermHighlight>Semantic chunking</TermHighlight> (500-1000 tokens) with 100-200 token overlap to preserve context boundaries</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><strong>Step 3:</strong> <TermHighlight>Embedding</TermHighlight> generation using <TermHighlight>OpenAI text-embedding-3-small</TermHighlight> (batch processing: 100 chunks per API call)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><strong>Step 4:</strong> <TermHighlight>Vector</TermHighlight> storage in <TermHighlight>PostgreSQL</TermHighlight> with <TermHighlight>pgvector</TermHighlight> extension, indexed with <TermHighlight>HNSW</TermHighlight></span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                      <h4 className="font-semibold text-gray-900 mb-2">Chunking Strategy Details</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span><strong>Sentence-aware chunking:</strong> Split at sentence boundaries using <TermHighlight>NLTK</TermHighlight> or <TermHighlight>spaCy</TermHighlight>, not mid-sentence, to preserve meaning</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span><strong>Overlap strategy:</strong> 100-200 token overlap ensures context continuity between chunks for better retrieval</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span><strong>Metadata preservation:</strong> Each chunk stores page number, section title, and document hierarchy in <TermHighlight>JSONB</TermHighlight> field</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span><strong>Special handling:</strong> Tables and diagrams extracted separately with descriptive text captions using <TermHighlight>OCR</TermHighlight> if needed</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Performance & Scale</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-600 mt-1">•</span>
                        <span><strong>Query latency:</strong> <TermHighlight>HNSW</TermHighlight> index enables sub-50ms similarity search for <TermHighlight>top-k</TermHighlight> retrieval on 10M+ vectors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-600 mt-1">•</span>
                        <span><strong>Storage:</strong> ~1KB per chunk (text + <TermHighlight>embedding</TermHighlight>) = 10GB for 10M chunks per tenant</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-600 mt-1">•</span>
                        <span><strong>Index size:</strong> <TermHighlight>HNSW</TermHighlight> index adds ~30% overhead (3GB for 10M vectors)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Video Knowledge Base */}
                <div id="component-video-knowledge-base" className={`bg-white rounded-xl shadow-lg p-8 transition-all duration-300 ${selectedComponent === 'video-knowledge-base' ? 'ring-4 ring-primary-500 ring-offset-2' : ''}`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Video className="w-7 h-7 text-red-600" />
                    Tenant Video Knowledge Base
                  </h3>
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    This stores all the training videos and video tutorials for each factory. The system converts the spoken words in videos into text, so users can search through video content just like they search through documents, and the system can tell them exactly which part of which video has the answer.
                  </p>
                  <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Example Use Case</h4>
                    <p className="text-gray-700 text-sm">
                      Factory B uploads a 30-minute training video showing how to calibrate the grinder. <TermHighlight>Whisper</TermHighlight> transcribes the audio into text with timestamps. The system creates chunks every 30 seconds and stores them with <TermHighlight>embeddings</TermHighlight>. When a machinist asks "How do I adjust the grind size?", the system finds the transcript chunk from 08:15-08:45 that says "To adjust grind size, turn the dial clockwise for finer..." and returns it with a clickable link to jump directly to that timestamp in the video.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Multi-Tenant Storage</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Isolated per-factory video knowledge base</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Same PostgreSQL + <TermHighlight>pgvector</TermHighlight> setup as Document KB</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Separate table or document_type filter for video chunks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Timestamp metadata for precise video navigation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Data residency: EU data stays in EU, China in China</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Data Schema & Indexing</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><code className="bg-gray-100 px-1 rounded">chunk_id (UUID)</code>, <code className="bg-gray-100 px-1 rounded">transcript_text (TEXT)</code>, <code className="bg-gray-100 px-1 rounded">embedding_vector (vector(1536))</code></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><code className="bg-gray-100 px-1 rounded">video_id (VARCHAR)</code>, <code className="bg-gray-100 px-1 rounded">timestamp_start (INTERVAL)</code>, <code className="bg-gray-100 px-1 rounded">timestamp_end (INTERVAL)</code></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><code className="bg-gray-100 px-1 rounded">scene_description (TEXT)</code> for Phase 2 vision enhancement</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><code className="bg-gray-100 px-1 rounded">keyframe_paths (TEXT[])</code> for storing screenshot file paths (Starter tier)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><TermHighlight>HNSW</TermHighlight> index on <code className="bg-gray-100 px-1 rounded">embedding_vector</code> and <TermHighlight>B-tree</TermHighlight> index on <code className="bg-gray-100 px-1 rounded">video_id</code> for fast lookups</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Ingestion Process</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><strong>Step 1:</strong> Video transcription using <TermHighlight>Whisper</TermHighlight> large-v3 (self-hosted on GPU) or API</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><strong>Step 2:</strong> Timestamp alignment: Map transcript segments to video timestamps (HH:MM:SS format)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><strong>Step 3:</strong> Keyframe extraction: Screenshot every 10 seconds using <TermHighlight>FFmpeg</TermHighlight> or <TermHighlight>OpenCV</TermHighlight></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><strong>Step 4:</strong> <TermHighlight>Semantic chunking</TermHighlight> of transcript (500-1000 tokens) with timestamp boundaries preserved</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><strong>Step 5:</strong> <TermHighlight>Embedding</TermHighlight> generation and <TermHighlight>vector</TermHighlight> storage in <TermHighlight>pgvector</TermHighlight></span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                      <h4 className="font-semibold text-gray-900 mb-2">Transcription Details</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span><strong>Model:</strong> <TermHighlight>Whisper</TermHighlight> large-v3 for high accuracy (95%+ WER on technical content)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span><strong>Processing:</strong> Self-hosted on <TermHighlight>GPU</TermHighlight> (g5.xlarge) = $0.01/hour vs $0.36/hour API</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span><strong>Output format:</strong> <TermHighlight>SRT</TermHighlight> or <TermHighlight>VTT</TermHighlight> with timestamps for precise alignment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span><strong>Language detection:</strong> Auto-detect or force language for better accuracy</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 bg-orange-50 border-l-4 border-orange-500 rounded p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Cost-Optimized Storage Strategy</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span><strong>Starter tier:</strong> Store transcripts + keyframes only (96% storage reduction, $0.008/factory/month)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span><strong>Pro tier:</strong> <TermHighlight>Cloudflare</TermHighlight> Stream for 30-day video retention (egress included, $5/factory/month)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span><strong>Enterprise:</strong> Full video + archive tiering (unlimited retention, $20/factory/month)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span><strong>Key insight:</strong> Video egress costs ($225K/month) would exceed all other costs. Transcript-first approach reduces to $4.5K/month (98% savings)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Response Generation */}
                <div id="component-response-generation" className={`bg-white rounded-xl shadow-lg p-8 transition-all duration-300 ${selectedComponent === 'response-generation' ? 'ring-4 ring-primary-500 ring-offset-2' : ''}`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Brain className="w-7 h-7 text-indigo-600" />
                    Response Generation
                  </h3>
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    After finding the relevant information, this component puts it all together into a clear, easy-to-understand answer. It makes sure the answer sounds natural and includes references to where the information came from, so users know they can trust it and find more details if needed.
                  </p>
                  <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Example Use Case</h4>
                    <p className="text-gray-700 text-sm">
                      The retrieval system found 3 relevant chunks: one from a PDF manual (page 23) about temperature settings, one from a video transcript (05:12) about extraction time, and one from another PDF (page 45) about pressure. The <TermHighlight>LLM</TermHighlight> (<TermHighlight>GPT-4o</TermHighlight>) synthesizes these into a coherent answer: "For optimal espresso extraction, use 9 bar pressure, 200°F temperature, and 25-30 second extraction time. See page 23 in CoffeeBig.pdf, page 45 in CoffeeChurch.pdf, and 05:12 in tutorial.mp4 for more details." The answer is formatted with <TermHighlight>Markdown</TermHighlight> and includes clickable source links.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Smart LLM Routing & Prompting</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Route to <TermHighlight>GPT-4o-mini</TermHighlight> (simple, $0.15/1M tokens) or <TermHighlight>GPT-4o</TermHighlight> (complex, $5/1M tokens)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><strong>Prompt template:</strong> System message + context chunks + user query + formatting instructions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><TermHighlight>Context window</TermHighlight>: Up to 128K tokens for <TermHighlight>GPT-4o</TermHighlight>, 16K for <TermHighlight>GPT-4o-mini</TermHighlight></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Synthesize retrieved chunks (3-5) into coherent answer using <TermHighlight>RAG</TermHighlight> pattern</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Cache response in <TermHighlight>Redis</TermHighlight> for future similar queries (24h TTL)</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Source Attribution & Citations</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Include page numbers for PDF sources: <code className="bg-gray-100 px-1 rounded">"See page 42 in CoffeeBig.pdf"</code></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Include timestamps for video sources: <code className="bg-gray-100 px-1 rounded">"See 05:23-05:45 in tutorial.mp4"</code></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Clickable deep links to original sources with <TermHighlight>URL</TermHighlight> parameters for page/timestamp</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Multiple source citations when answer spans multiple documents</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Confidence score based on <TermHighlight>cosine similarity</TermHighlight> of retrieved chunks (0.0-1.0)</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Answer Formatting & Post-Processing</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Structured response with clear sections (Summary, Steps, Notes)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span><TermHighlight>Markdown</TermHighlight> formatting for code blocks, lists, tables, and emphasis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Post-processing: Remove hallucinations, validate against source chunks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Token limit: Max 2000 tokens response (truncate if longer)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>Streaming support: Optional <TermHighlight>Server-Sent Events</TermHighlight> for real-time response display</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-500">
                    <h4 className="font-semibold text-gray-900 mb-2">Prompt Engineering Details</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span><strong>System prompt:</strong> "You are a helpful assistant for machinists. Answer based ONLY on the provided context. If information is missing, say so."</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span><strong>Context injection:</strong> Include top-3 retrieved chunks with source metadata in <TermHighlight>JSON</TermHighlight> format</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span><strong>Temperature:</strong> 0.1 for factual accuracy, 0.3 for slightly more creative explanations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span><strong>Max tokens:</strong> 2000 output tokens to balance completeness and cost</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span><strong>Error handling:</strong> Retry with exponential backoff on <TermHighlight>API</TermHighlight> failures, fallback to cached response if available</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Key Design Decisions */}
          {currentSection === 3 && (
            <div className="section-transition animate-fadeIn">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Key Design Decisions</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <DecisionCard
                  id="vector-db"
                  title="Vector Database Choice"
                  decision={<><TermHighlight>PostgreSQL</TermHighlight> + <TermHighlight>pgvector</TermHighlight></>}
                  pros={["Simple operations (familiar SQL)", "Lower cost (no separate service)", "Sufficient performance for MVP scale"]}
                  cons={["May need upgrade at scale (100k+ docs)", "Requires PostgreSQL expertise"]}
                  rationale={<span>Best for MVP with 2 PDFs + 2 videos. Easy to operate, no additional infrastructure, and <TermHighlight>pgvector</TermHighlight> provides excellent performance for this scale.</span>}
                  expanded={expandedDecisions['vector-db']}
                  onToggle={() => toggleDecision('vector-db')}
                />
                
                <DecisionCard
                  id="video-handling"
                  title="Video Handling Strategy"
                  decision="Transcript-only MVP"
                  pros={["Faster to implement", "Lower cost (no video processing)", "Sufficient for Q&A use case"]}
                  cons={["No visual context", "May miss non-verbal cues"]}
                  rationale="For MVP, transcript provides all textual information needed. Can add video frame analysis later if needed."
                  expanded={expandedDecisions['video-handling']}
                  onToggle={() => toggleDecision('video-handling')}
                />
                
                <DecisionCard
                  id="rag-vs-finetune"
                  title="RAG vs Fine-tuning"
                  decision={<><TermHighlight>RAG</TermHighlight> (Retrieval-Augmented Generation)</>}
                  pros={["No training data needed", "Easy to update knowledge", "Transparent sources", "Lower cost"]}
                  cons={["Retrieval quality critical", "Context window limits"]}
                  rationale="RAG is ideal for this use case: we have structured documents, need source attribution, and want to avoid training costs."
                  expanded={expandedDecisions['rag-vs-finetune']}
                  onToggle={() => toggleDecision('rag-vs-finetune')}
                />
                
                <DecisionCard
                  id="chunking"
                  title="Chunking Strategy"
                  decision={<><TermHighlight>Semantic</TermHighlight> <TermHighlight>chunking</TermHighlight> with overlap</>}
                  pros={["Preserves context", "Better retrieval accuracy", "Handles long documents"]}
                  cons={["More storage", "Potential redundancy"]}
                  rationale="500-1000 token chunks with 100-200 token overlap ensure we capture complete thoughts while maintaining retrieval precision."
                  expanded={expandedDecisions['chunking']}
                  onToggle={() => toggleDecision('chunking')}
                />
                
                <DecisionCard
                  id="stateless"
                  title="Stateful vs Stateless"
                  decision={<><TermHighlight>Stateless</TermHighlight> API</>}
                  pros={["Simpler architecture", "Easier scaling", "No session management"]}
                  cons={["No conversation memory", "Each query independent"]}
                  rationale="For MVP, stateless is simpler. Can add conversation context later if users need follow-up question handling."
                  expanded={expandedDecisions['stateless']}
                  onToggle={() => toggleDecision('stateless')}
                />
                
                <DecisionCard
                  id="vision-timing"
                  title="Vision Integration Timing"
                  decision="Phase 2 enhancement, not MVP"
                  pros={["MVP validates core value first", "Vision APIs are expensive ($0.01-0.05 per image)", "Simpler debugging without vision complexity"]}
                  cons={["Some queries unsolvable without vision", "Delayed feature users may want"]}
                  rationale="Start with transcript-only (covers 80% of queries), add vision once we validate product-market fit and have budget for higher API costs."
                  expanded={expandedDecisions['vision-timing']}
                  onToggle={() => toggleDecision('vision-timing')}
                />
                
                <DecisionCard
                  id="multi-tenant"
                  title="Multi-Tenant Architecture"
                  decision="Shared infrastructure, isolated data"
                  pros={["Cost-effective compute sharing", "Perfect data isolation per factory", "Independent scaling per tenant", "Data residency compliance (EU, China)"]}
                  cons={["More complex operations", "Database-per-tenant overhead"]}
                  rationale="Shared <TermHighlight>Kubernetes</TermHighlight> clusters for compute efficiency, but database-per-tenant (or shared for small tenants) ensures security, compliance, and independent scaling. Critical for serving 10,000+ factories."
                  expanded={expandedDecisions['multi-tenant']}
                  onToggle={() => toggleDecision('multi-tenant')}
                />
                
                <DecisionCard
                  id="caching-strategy"
                  title="Caching Strategy"
                  decision="Multi-level aggressive caching"
                  pros={["70-90% cache hit rate", "Reduces LLM costs by 70-90%", "Sub-100ms response for cached queries", "Pre-computed FAQs for common questions"]}
                  cons={["Cache invalidation complexity", "Memory costs for Redis clusters"]}
                  rationale="At 10M queries/day, caching is essential. Three layers: exact match (<TermHighlight>Redis</TermHighlight>), <TermHighlight>semantic</TermHighlight> similarity (<TermHighlight>vector</TermHighlight> cache), and pre-computed FAQs. Target 80%+ hit rate to achieve <$0.01 per query cost."
                  expanded={expandedDecisions['caching-strategy']}
                  onToggle={() => toggleDecision('caching-strategy')}
                />
                
                <DecisionCard
                  id="model-routing"
                  title="Model Routing Strategy"
                  decision="Tiered routing by query complexity"
                  pros={["30-50% cost savings on LLM", "Faster responses for simple queries", "Better quality for complex queries", "Automatic classification"]}
                  cons={["Classification accuracy critical", "More complex routing logic"]}
                  rationale="Route 70% of simple queries to <TermHighlight>GPT-4o-mini</TermHighlight> ($0.15/1M tokens) and 30% complex queries to <TermHighlight>GPT-4o</TermHighlight> ($5/1M tokens). Classification based on query type (factual vs reasoning)."
                  expanded={expandedDecisions['model-routing']}
                  onToggle={() => toggleDecision('model-routing')}
                />
                
                <DecisionCard
                  id="video-storage"
                  title="Video Storage Strategy"
                  decision="Transcript-first with tiered video storage"
                  pros={["98% cost reduction ($225K → $4.5K/month)", "Transcript + keyframes deliver 95% of value", "Cloudflare Stream for Pro tier (egress included)", "Automatic lifecycle tiering (hot → warm → archive)"]}
                  cons={["No full video playback for Starter tier", "Keyframe extraction adds processing time", "More complex storage architecture"]}
                  rationale="Video egress costs ($225K/month) would bankrupt the business. Solution: Store transcripts + keyframes for all tiers (96% storage reduction), offer video playback only for Pro/Enterprise via <TermHighlight>Cloudflare</TermHighlight> Stream. Most machinists prefer quick reference over watching full videos."
                  expanded={expandedDecisions['video-storage']}
                  onToggle={() => toggleDecision('video-storage')}
                />
              </div>
            </div>
          )}

          {/* Section 5: Global Scale Strategy */}
          {currentSection === 4 && (
            <div className="section-transition animate-fadeIn">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Global Scale Strategy</h2>
              
              <div className="space-y-8">
                {/* Multi-Tenant Architecture */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Multi-Tenant Architecture Pattern</h3>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                      <h4 className="font-bold text-gray-900 mb-3">Shared Infrastructure, Isolated Data ✅</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Shared compute (<TermHighlight>Kubernetes</TermHighlight> clusters) - cheaper</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Isolated databases per tenant - security/compliance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Independent scaling per factory size</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Regional deployment for latency (US, EU, APAC)</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-3">Database Strategy</h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="font-semibold text-gray-900">Small tenants (&lt;100 users):</p>
                          <p className="text-gray-700">Shared multi-tenant database</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Large tenants (&gt;100 users):</p>
                          <p className="text-gray-700">Dedicated database per factory</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Benefits:</p>
                          <p className="text-gray-700">Perfect isolation, independent scaling, data residency compliance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cost Optimization */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Cost Optimization Strategies</h3>
                  
                  <div className="space-y-6">
                    <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-green-600" />
                        1. Aggressive Response Caching (🎯 TOP PRIORITY)
                      </h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-gray-900 mb-2">Layer 1: Exact Match</p>
                          <p className="text-gray-700"><TermHighlight>Redis</TermHighlight> cache for identical queries. Saves 100% <TermHighlight>LLM</TermHighlight> cost.</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-2">Layer 2: Semantic Cache</p>
                          <p className="text-gray-700"><TermHighlight>Vector</TermHighlight> similarity (0.95+) returns cached response. Saves 60-70%.</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-2">Layer 3: Pre-computed FAQ</p>
                          <p className="text-gray-700">100 most common questions per machine type. Saves 30-40%.</p>
                        </div>
                      </div>
                      <div className="mt-4 bg-white rounded p-3">
                        <p className="text-sm font-semibold text-gray-900">Impact: Reduce <TermHighlight>LLM</TermHighlight> costs by <span className="text-green-600">70-90%</span></p>
                      </div>
                    </div>

                    <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Brain className="w-5 h-5 text-blue-600" />
                        2. Smart Model Routing
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-gray-900 mb-2">Simple Queries (70%)</p>
                          <p className="text-gray-700"><TermHighlight>GPT-4o-mini</TermHighlight>: $0.15/1M tokens</p>
                          <p className="text-gray-600 text-xs mt-1">Factual lookups, single-source answers</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-2">Complex Queries (30%)</p>
                          <p className="text-gray-700"><TermHighlight>GPT-4o</TermHighlight>: $5.00/1M tokens</p>
                          <p className="text-gray-600 text-xs mt-1">Multi-step reasoning, conflicting sources</p>
                        </div>
                      </div>
                      <div className="mt-4 bg-white rounded p-3">
                        <p className="text-sm font-semibold text-gray-900">Savings: <span className="text-blue-600">30-50%</span> on <TermHighlight>LLM</TermHighlight> costs</p>
                      </div>
                    </div>

                    <div className="border-l-4 border-purple-500 bg-purple-50 p-6 rounded">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Search className="w-5 h-5 text-purple-600" />
                        3. Hybrid Search (Cheaper Retrieval)
                      </h4>
                      <div className="text-sm space-y-2">
                        <p className="text-gray-700"><strong>First Pass:</strong> Keyword search (FREE) - catches 40% of queries</p>
                        <p className="text-gray-700"><strong>Second Pass:</strong> <TermHighlight>Semantic search</TermHighlight> ($) - only if keyword fails</p>
                      </div>
                      <div className="mt-4 bg-white rounded p-3">
                        <p className="text-sm font-semibold text-gray-900">Savings: Avoid embedding generation on <span className="text-purple-600">40%</span> of queries</p>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-500 bg-yellow-50 p-6 rounded">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Database className="w-5 h-5 text-yellow-600" />
                        4. Batch Processing & Self-Hosted Services
                      </h4>
                      <div className="text-sm space-y-2 text-gray-700">
                        <p>• Process documents during off-peak hours</p>
                        <p>• Self-host <TermHighlight>Whisper</TermHighlight> for transcription: $0.01/hour vs $0.36/hour <TermHighlight>API</TermHighlight></p>
                        <p>• Self-host <TermHighlight>embedding</TermHighlight> models (<TermHighlight>all-MiniLM-L6-v2</TermHighlight>) on <TermHighlight>CPU</TermHighlight> instances</p>
                      </div>
                    </div>

                    <div className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Video className="w-5 h-5 text-orange-600" />
                        5. Edge Inference for Embeddings
                      </h4>
                      <div className="text-sm space-y-2 text-gray-700">
                        <p>• <TermHighlight>Cloudflare</TermHighlight> <TermHighlight>Workers</TermHighlight> / <TermHighlight>Lambda</TermHighlight>@Edge for fast, cheap operations</p>
                        <p>• Self-host <TermHighlight>all-MiniLM-L6-v2</TermHighlight> on <TermHighlight>CPU</TermHighlight> instances (~100ms latency globally)</p>
                        <p>• Cost: $0.30 per 1M requests vs. API costs</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Storage Strategy */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Video Storage Strategy (CRITICAL COST OPTIMIZATION)</h3>
                  
                  <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-6">
                    <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      The Problem: Video Egress Costs Will Bankrupt You
                    </h4>
                    <div className="text-sm text-gray-700 space-y-2">
                      <p>At 1M users watching 5 videos/day:</p>
                      <ul className="list-disc list-inside ml-2 space-y-1">
                        <li>Bandwidth: <strong>2.5PB/month</strong></li>
                        <li><TermHighlight>AWS</TermHighlight> egress: <strong className="text-red-600">$225K/month</strong></li>
                        <li>This exceeds ALL other costs combined! 🚨</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Tier 1: Transcript Only */}
                    <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        Tier 1: Transcript + Keyframes Only ✅ BEST FOR MVP
                      </h4>
                      <div className="text-sm space-y-3 text-gray-700">
                        <div className="bg-white rounded p-3">
                          <p className="font-semibold mb-2">Processing Pipeline:</p>
                          <ol className="list-decimal list-inside space-y-1 ml-2">
                            <li>Extract audio → Whisper → transcript</li>
                            <li>Generate keyframe screenshots (1 per 10 seconds)</li>
                            <li><strong>DELETE original video</strong></li>
                            <li>Store: transcript + keyframes only</li>
                          </ol>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="font-semibold">Storage per factory:</p>
                            <p>20 videos × 30 min = ~360MB (vs. 10GB for videos!)</p>
                          </div>
                          <div>
                            <p className="font-semibold">Cost:</p>
                            <p className="text-green-600 font-bold">$0.008/factory/month</p>
                            <p className="text-xs text-gray-600">96% storage reduction</p>
                          </div>
                        </div>
                        <div className="bg-white rounded p-3 mt-2">
                          <p className="text-xs"><strong>User Experience:</strong> Return transcript excerpt + relevant keyframe image + timestamp. 95% of value delivered without full video playback.</p>
                        </div>
                      </div>
                    </div>

                    {/* Tier 2: Optimized Video Delivery */}
                    <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded">
                      <h4 className="font-bold text-gray-900 mb-3">Tier 2: Optimized Video Delivery (If You MUST Store Videos)</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-gray-900 mb-2">A. Aggressive Compression</p>
                          <p className="text-gray-700">ffmpeg optimization: 500MB → 50MB (90% reduction, 720p H.265)</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-2">B. Cloudflare Stream</p>
                          <p className="text-gray-700">$5/1000 min stored, egress INCLUDED. 89% cost reduction vs S3.</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-2">C. Smart Caching</p>
                          <p className="text-gray-700">80-90% hit rate for popular videos at edge. Effective egress: $0.01/GB</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-2">D. Lazy Loading</p>
                          <p className="text-gray-700">Show transcript first, load video only if requested (~20% load rate)</p>
                        </div>
                      </div>
                    </div>

                    {/* Tier 3: Hybrid Storage */}
                    <div className="border-l-4 border-purple-500 bg-purple-50 p-6 rounded">
                      <h4 className="font-bold text-gray-900 mb-3">Tier 3: Hybrid Storage Architecture ✅ RECOMMENDED</h4>
                      <div className="space-y-3 text-sm">
                        <div className="bg-white rounded p-3">
                          <p className="font-semibold text-gray-900 mb-2">Recent Videos (Last 30 days):</p>
                          <p className="text-gray-700"><TermHighlight>Cloudflare</TermHighlight> Stream - High access, fast delivery ($5/1K min)</p>
                        </div>
                        <div className="bg-white rounded p-3">
                          <p className="font-semibold text-gray-900 mb-2">Older Videos (30-90 days):</p>
                          <p className="text-gray-700"><TermHighlight>S3</TermHighlight> Infrequent Access - Only if requested ($0.0125/GB storage)</p>
                        </div>
                        <div className="bg-white rounded p-3">
                          <p className="font-semibold text-gray-900 mb-2">Archive (90+ days):</p>
                          <p className="text-gray-700"><TermHighlight>Glacier</TermHighlight> Instant Retrieval - Keep transcripts + keyframes hot ($0.004/GB)</p>
                        </div>
                      </div>
                    </div>

                    {/* Cost Comparison */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-4">Real Cost Comparison (100K factories)</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="bg-red-50 rounded p-3 border border-red-200">
                          <p className="font-semibold text-gray-900 mb-2">Option 1: Store All Videos (<TermHighlight>S3</TermHighlight>)</p>
                          <p className="text-red-600 font-bold">$248K/month</p>
                          <p className="text-xs text-gray-600 mt-1">Storage + egress</p>
                        </div>
                        <div className="bg-green-50 rounded p-3 border border-green-200">
                          <p className="font-semibold text-gray-900 mb-2">Option 2: Transcript Only</p>
                          <p className="text-green-600 font-bold">$828/month</p>
                          <p className="text-xs text-gray-600 mt-1">99.7% savings!</p>
                        </div>
                        <div className="bg-blue-50 rounded p-3 border border-blue-200">
                          <p className="font-semibold text-gray-900 mb-2">Option 3: CF Stream + Tiering</p>
                          <p className="text-blue-600 font-bold">$3.1K/month</p>
                          <p className="text-xs text-gray-600 mt-1">98.8% savings!</p>
                        </div>
                      </div>
                    </div>

                    {/* Customer Storage Options */}
                    <div className="bg-primary-50 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-4">Customer Storage Options (Pricing Tiers)</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Starter:</p>
                          <p className="text-gray-700">Transcript + keyframes only</p>
                          <p className="text-xs text-gray-600 mt-1">Cost: $0.008/factory/month</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Professional:</p>
                          <p className="text-gray-700">30-day video retention</p>
                          <p className="text-xs text-gray-600 mt-1">Cost: $5/factory/month</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Enterprise:</p>
                          <p className="text-gray-700">Unlimited retention + custom</p>
                          <p className="text-xs text-gray-600 mt-1">Cost: $20/factory/month</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Cost Breakdown at Scale (10M queries/day)</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-4">Before Optimization ❌</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-700">LLM:</span>
                          <span className="font-bold text-red-600">$500K/day</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Embeddings:</span>
                          <span className="font-bold">$5K/day</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Infrastructure:</span>
                          <span className="font-bold">$5K/day</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Video Storage + Egress:</span>
                          <span className="font-bold text-red-600">$225K/day</span>
                        </div>
                        <div className="border-t border-red-300 pt-2 mt-2 flex justify-between">
                          <span className="font-bold text-gray-900">Total:</span>
                          <span className="font-bold text-red-600">$735K/day = $22M/month</span>
                        </div>
                        <p className="text-xs text-red-600 mt-2">UNSUSTAINABLE</p>
                      </div>
                    </div>
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-4">After Optimization ✅</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-700">LLM (90% cache hit):</span>
                          <span className="font-bold text-green-600">$50K/day</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Embeddings (hybrid):</span>
                          <span className="font-bold text-green-600">$500/day</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Infrastructure:</span>
                          <span className="font-bold text-green-600">$10K/day</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Storage (transcript-first + CF Stream):</span>
                          <span className="font-bold text-green-600">$150/day</span>
                        </div>
                        <div className="border-t border-green-300 pt-2 mt-2 flex justify-between">
                          <span className="font-bold text-gray-900">Total:</span>
                          <span className="font-bold text-green-600">$60K/day = $1.8M/month</span>
                        </div>
                        <p className="text-xs text-green-600 mt-2">~$1.80/user/month ✅ VIABLE</p>
                        <p className="text-xs text-gray-600 mt-1">Video storage: 98% cost reduction ($225K → $4.5K/month)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing Model */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Pricing Model to Support Scale</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-300">
                      <h4 className="font-bold text-gray-900 mb-2">Starter</h4>
                      <p className="text-2xl font-bold text-primary-600 mb-1">$10/user/month</p>
                      <p className="text-xs text-gray-600 mb-3">Up to 50 queries/day</p>
                      <p className="text-xs text-gray-500">70% of users</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-300">
                      <h4 className="font-bold text-gray-900 mb-2">Professional</h4>
                      <p className="text-2xl font-bold text-primary-600 mb-1">$25/user/month</p>
                      <p className="text-xs text-gray-600 mb-3">Unlimited queries, faster models</p>
                      <p className="text-xs text-gray-500">25% of users</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-300">
                      <h4 className="font-bold text-gray-900 mb-2">Enterprise</h4>
                      <p className="text-2xl font-bold text-primary-600 mb-1">Custom</p>
                      <p className="text-xs text-gray-600 mb-3">Dedicated infrastructure, SLA</p>
                      <p className="text-xs text-gray-500">5% of users</p>
                    </div>
                  </div>
                  <div className="mt-6 bg-primary-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <strong>At 1M users:</strong> ~$15M/month revenue vs $1.8M cost = <strong className="text-primary-600">88% gross margin</strong>
                    </p>
                  </div>
                </div>

                {/* Migration Path */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Migration Path: MVP → Global Scale</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">Phase 1: Single Tenant MVP (Months 1-2)</h4>
                        <p className="text-sm text-gray-700">Monolithic app, single PostgreSQL, OpenAI API. Cost: &lt;$500/month</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">Phase 2: Multi-Tenant (Months 3-6)</h4>
                        <p className="text-sm text-gray-700">Kubernetes, tenant isolation, Redis caching. Cost: $5K-10K/month (10-50 tenants)</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">Phase 3: Regional Expansion (Months 6-12)</h4>
                        <p className="text-sm text-gray-700">3 regions, database-per-tenant for large customers, self-hosted embeddings. Cost: $50K/month (1,000 tenants)</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">Phase 4: Global Scale (Year 2+)</h4>
                        <p className="text-sm text-gray-700">Full optimization stack, 10+ regions, custom inference hardware. Cost: $1-2M/month (100K+ tenants)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Bottlenecks & Hidden Costs */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Additional Bottlenecks & Hidden Costs</h3>
                  
                  <div className="space-y-6">
                    {/* Embedding Generation Bottleneck */}
                    <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        1. Embedding Generation Bottleneck
                      </h4>
                      <div className="text-sm space-y-3 text-gray-700">
                        <div className="bg-white rounded p-3">
                          <p className="font-semibold mb-2">The Problem:</p>
                          <p>Even with hybrid search, 60% of queries (6M/day) still need embeddings. At 10M queries/day:</p>
                          <ul className="list-disc list-inside ml-2 mt-2 space-y-1">
                            <li>OpenAI embedding API: 3,000 requests/min limit per account</li>
                            <li>Need 10+ API accounts or face rate limiting</li>
                            <li>Each embedding: ~50ms latency → adds 250ms to P95 latency</li>
                            <li>Cost: $0.0001/1K tokens × 6M queries = $600/day if not optimized</li>
                          </ul>
                        </div>
                        <div className="bg-white rounded p-3">
                          <p className="font-semibold mb-2">Solutions:</p>
                          <ul className="list-disc list-inside ml-2 space-y-1">
                            <li><strong>Self-host embedding models:</strong> all-MiniLM-L6-v2 on CPU instances (80% as good, 10x cheaper)</li>
                            <li><strong>Batch embedding generation:</strong> Pre-compute embeddings for common queries</li>
                            <li><strong>Edge deployment:</strong> Cloudflare Workers for sub-100ms global latency</li>
                            <li><strong>Connection pooling:</strong> Reuse connections to embedding service (avoid connection overhead)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Vector DB Performance */}
                    <div className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Database className="w-5 h-5 text-orange-600" />
                        2. Vector Database Performance at Scale
                      </h4>
                      <div className="text-sm space-y-3 text-gray-700">
                        <div className="bg-white rounded p-3">
                          <p className="font-semibold mb-2">The Problem:</p>
                          <ul className="list-disc list-inside ml-2 space-y-1">
                            <li><strong><TermHighlight>pgvector</TermHighlight> limits:</strong> 10M+ <TermHighlight>vector</TermHighlight>s per tenant → query latency degrades (500ms+ for <TermHighlight>top-k</TermHighlight> search)</li>
                            <li><strong>Index maintenance:</strong> <TermHighlight>HNSW</TermHighlight> index rebuilds block queries (30+ min for large tenants)</li>
                            <li><strong>Connection pool exhaustion:</strong> <TermHighlight>PostgreSQL</TermHighlight> max connections (typically 100-200) → need connection pooling</li>
                            <li><strong>Memory pressure:</strong> Vector indexes consume RAM (10GB+ for 10M vectors)</li>
                          </ul>
                        </div>
                        <div className="bg-white rounded p-3">
                          <p className="font-semibold mb-2">Solutions:</p>
                          <ul className="list-disc list-inside ml-2 space-y-1">
                            <li><strong>Migrate to <TermHighlight>Qdrant</TermHighlight>/<TermHighlight>Weaviate</TermHighlight>:</strong> Purpose-built for <TermHighlight>vector</TermHighlight>s, better at scale (sub-50ms queries)</li>
                            <li><strong>Connection pooling:</strong> <TermHighlight>PgBouncer</TermHighlight> or built-in poolers (maintain 20-50 connections, not 1000s)</li>
                            <li><strong>Read replicas:</strong> Separate read/write databases (read queries don't block writes)</li>
                            <li><strong>Partitioning:</strong> Split large tenant DBs by document type or date</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Cache Memory Costs */}
                    <div className="border-l-4 border-yellow-500 bg-yellow-50 p-6 rounded">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-600" />
                        3. Cache Memory Costs (Hidden Expense)
                      </h4>
                      <div className="text-sm space-y-3 text-gray-700">
                        <div className="bg-white rounded p-3">
                          <p className="font-semibold mb-2">The Math:</p>
                          <p>At 10M queries/day with 80% cache hit rate:</p>
                          <ul className="list-disc list-inside ml-2 mt-2 space-y-1">
                            <li>Cache 8M unique queries × 2KB average response = 16GB cache</li>
                            <li>Semantic cache: 8M query embeddings × 384 bytes = 3GB</li>
                            <li>Pre-computed FAQs: 100 FAQs × 10KB = 1MB</li>
                            <li><strong>Total: ~20GB per region × 3 regions = 60GB</strong></li>
                            <li><TermHighlight>Redis</TermHighlight> <TermHighlight>ElastiCache</TermHighlight> r6g.xlarge (26GB): $0.20/hour = $144/month per region</li>
                            <li><strong>Total cache cost: $432/month (3 regions)</strong></li>
                          </ul>
                        </div>
                        <div className="bg-white rounded p-3">
                          <p className="font-semibold mb-2">Optimization:</p>
                          <ul className="list-disc list-inside ml-2 space-y-1">
                            <li><strong><TermHighlight>LRU</TermHighlight> eviction:</strong> Keep only top 80% most accessed queries</li>
                            <li><strong>Compression:</strong> <TermHighlight>Gzip</TermHighlight> cache values (50% size reduction)</li>
                            <li><strong>Cache warming:</strong> Pre-populate cache for new tenants (avoid cold start)</li>
                            <li><strong>Tiered caching:</strong> Hot cache (<TermHighlight>Redis</TermHighlight>) + warm cache (<TermHighlight>S3</TermHighlight>) for less frequent queries</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* API Rate Limits */}
                    <div className="border-l-4 border-purple-500 bg-purple-50 p-6 rounded">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-purple-600" />
                        4. API Rate Limits & Multi-Account Strategy
                      </h4>
                      <div className="text-sm space-y-3 text-gray-700">
                        <div className="bg-white rounded p-3">
                          <p className="font-semibold mb-2">The Problem:</p>
                          <ul className="list-disc list-inside ml-2 space-y-1">
                            <li><strong><TermHighlight>OpenAI</TermHighlight> limits:</strong> 10,000 requests/min per account (need 50+ accounts at scale)</li>
                            <li><strong><TermHighlight>Anthropic</TermHighlight> limits:</strong> 5,000 requests/min per account</li>
                            <li><strong>Account management:</strong> Rotating <TermHighlight>API</TermHighlight> keys, monitoring per-account usage</li>
                            <li><strong>Failover complexity:</strong> When one account rate-limited, switch to backup</li>
                          </ul>
                        </div>
                        <div className="bg-white rounded p-3">
                          <p className="font-semibold mb-2">Solutions:</p>
                          <ul className="list-disc list-inside ml-2 space-y-1">
                            <li><strong>Multi-account load balancing:</strong> Round-robin across 50+ <TermHighlight>OpenAI</TermHighlight> accounts</li>
                            <li><strong>Automatic failover:</strong> Detect rate limits, switch to backup account/provider</li>
                            <li><strong>Request queuing:</strong> Queue requests when rate-limited, process when available</li>
                            <li><strong>Self-hosted fallback:</strong> <TermHighlight>Llama</TermHighlight> 3.1 for simple queries when <TermHighlight>API</TermHighlight>s are down</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Ingestion Pipeline Bottlenecks */}
                    <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        5. Ingestion Pipeline Bottlenecks
                      </h4>
                      <div className="text-sm space-y-3 text-gray-700">
                        <div className="bg-white rounded p-3">
                          <p className="font-semibold mb-2">The Problem:</p>
                          <ul className="list-disc list-inside ml-2 space-y-1">
                            <li><strong>Video processing queue:</strong> 100GB video upload → 2 hours processing → users wait</li>
                            <li><strong>Re-indexing overhead:</strong> Update 1 document → re-embed all chunks → 30min downtime</li>
                            <li><strong>Concurrent upload limits:</strong> Can't process 1000 factories uploading simultaneously</li>
                            <li><strong><TermHighlight>Whisper</TermHighlight> <TermHighlight>GPU</TermHighlight> costs:</strong> Self-hosted <TermHighlight>GPU</TermHighlight> instances: $1-3/hour when processing</li>
                          </ul>
                        </div>
                        <div className="bg-white rounded p-3">
                          <p className="font-semibold mb-2">Solutions:</p>
                          <ul className="list-disc list-inside ml-2 space-y-1">
                            <li><strong>Async processing:</strong> Queue uploads, process in background, notify when ready</li>
                            <li><strong>Incremental re-indexing:</strong> Only re-embed changed chunks, not entire document</li>
                            <li><strong>Auto-scaling workers:</strong> Scale <TermHighlight>GPU</TermHighlight> instances to zero when idle, up to 100+ during peak</li>
                            <li><strong>Batch processing:</strong> Process multiple videos in parallel on single GPU</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Monitoring & Observability Costs */}
                    <div className="border-l-4 border-gray-500 bg-gray-50 p-6 rounded">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-gray-600" />
                        6. Monitoring & Observability Costs (Hidden)
                      </h4>
                      <div className="text-sm space-y-3 text-gray-700">
                        <div className="bg-white rounded p-3">
                          <p className="font-semibold mb-2">The Math:</p>
                          <p>At 10M queries/day:</p>
                          <ul className="list-disc list-inside ml-2 mt-2 space-y-1">
                            <li><strong>Logs:</strong> 10M queries × 2KB log = 20GB/day = 600GB/month</li>
                            <li>CloudWatch/DataDog: $0.50/GB ingested = <strong>$300/month</strong></li>
                            <li><strong>Metrics:</strong> 100 metrics × 1M data points = 100M points/month</li>
                            <li>CloudWatch metrics: $0.30/million = <strong>$30/month</strong></li>
                            <li><strong>Traces:</strong> 10M traces × 10 spans = 100M spans/month</li>
                            <li>Distributed tracing: $0.50/million spans = <strong>$50/month</strong></li>
                            <li><strong>Total observability: ~$380/month</strong> (often overlooked!)</li>
                          </ul>
                        </div>
                        <div className="bg-white rounded p-3">
                          <p className="font-semibold mb-2">Optimization:</p>
                          <ul className="list-disc list-inside ml-2 space-y-1">
                            <li><strong>Sampling:</strong> Log/trace only 10% of requests (still catch errors)</li>
                            <li><strong>Log retention:</strong> Keep 7 days hot, 30 days cold (<TermHighlight>S3</TermHighlight>), delete after</li>
                            <li><strong>Structured logging:</strong> <TermHighlight>JSON</TermHighlight> logs compress better (60% size reduction)</li>
                            <li><strong>Self-hosted:</strong> Grafana + Loki + Prometheus (one-time cost, no per-GB fees)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Cold Start & Cache Warming */}
                    <div className="border-l-4 border-indigo-500 bg-indigo-50 p-6 rounded">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-indigo-600" />
                        7. Cold Start & Cache Warming
                      </h4>
                      <div className="text-sm space-y-3 text-gray-700">
                        <div className="bg-white rounded p-3">
                          <p className="font-semibold mb-2">The Problem:</p>
                          <ul className="list-disc list-inside ml-2 space-y-1">
                            <li><strong>New tenants:</strong> Zero cache → every query hits <TermHighlight>LLM</TermHighlight> → 10x higher cost</li>
                            <li><strong>First query latency:</strong> 2-3 seconds (no cache) vs 100ms (cached)</li>
                            <li><strong>Cache warming time:</strong> Takes 1-2 weeks to build useful cache</li>
                          </ul>
                        </div>
                        <div className="bg-white rounded p-3">
                          <p className="font-semibold mb-2">Solutions:</p>
                          <ul className="list-disc list-inside ml-2 space-y-1">
                            <li><strong>Pre-computed FAQs:</strong> Generate answers for 100 common questions during onboarding</li>
                            <li><strong>Cross-tenant learning:</strong> Use common queries from similar factories (same machine type)</li>
                            <li><strong>Progressive caching:</strong> Cache first 100 queries immediately, expand over time</li>
                            <li><strong>Onboarding flow:</strong> Ask users common questions during setup → pre-populate cache</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Data Consistency & Replication Lag */}
                    <div className="border-l-4 border-teal-500 bg-teal-50 p-6 rounded">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-teal-600" />
                        8. Data Consistency & Replication Lag
                      </h4>
                      <div className="text-sm space-y-3 text-gray-700">
                        <div className="bg-white rounded p-3">
                          <p className="font-semibold mb-2">The Problem:</p>
                          <ul className="list-disc list-inside ml-2 space-y-1">
                            <li><strong>Multi-region lag:</strong> Document update in US → EU sees stale data for 1-5 seconds</li>
                            <li><strong>Cache invalidation:</strong> Update document → cache still has old answer for 24 hours</li>
                            <li><strong>Eventual consistency:</strong> User updates manual → query might return old version</li>
                          </ul>
                        </div>
                        <div className="bg-white rounded p-3">
                          <p className="font-semibold mb-2">Solutions:</p>
                          <ul className="list-disc list-inside ml-2 space-y-1">
                            <li><strong>Cache versioning:</strong> Tag cache entries with document version, invalidate on update</li>
                            <li><strong>Read-after-write consistency:</strong> Route writes to primary, reads can use replicas</li>
                            <li><strong>Event-driven invalidation:</strong> Publish document update events → invalidate related cache entries</li>
                            <li><strong>User communication:</strong> "Your document was updated 30 seconds ago, refreshing..."</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Summary Table */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-4">Hidden Cost Summary</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-2 text-left font-semibold text-gray-900">Cost Category</th>
                              <th className="px-4 py-2 text-left font-semibold text-gray-900">Monthly Cost</th>
                              <th className="px-4 py-2 text-left font-semibold text-gray-900">Mitigation</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-2 text-gray-700">Cache Memory (<TermHighlight>Redis</TermHighlight>)</td>
                              <td className="px-4 py-2 font-semibold">$432</td>
                              <td className="px-4 py-2 text-gray-600"><TermHighlight>LRU</TermHighlight> eviction, compression</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 text-gray-700">Monitoring & Logs</td>
                              <td className="px-4 py-2 font-semibold">$380</td>
                              <td className="px-4 py-2 text-gray-600">Sampling, retention policies</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 text-gray-700">Connection Pooling Overhead</td>
                              <td className="px-4 py-2 font-semibold">$200</td>
                              <td className="px-4 py-2 text-gray-600"><TermHighlight>PgBouncer</TermHighlight>, read replicas</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 text-gray-700"><TermHighlight>GPU</TermHighlight> Workers (Ingestion)</td>
                              <td className="px-4 py-2 font-semibold">$500-2K</td>
                              <td className="px-4 py-2 text-gray-600">Auto-scale to zero, batch processing</td>
                            </tr>
                            <tr className="bg-gray-100">
                              <td className="px-4 py-2 font-bold text-gray-900">Total Hidden Costs</td>
                              <td className="px-4 py-2 font-bold text-gray-900">$1.5K-3K/month</td>
                              <td className="px-4 py-2 text-gray-600">Optimized: ~$500/month</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 6: MVP Scope */}
          {currentSection === 5 && (
            <div className="section-transition animate-fadeIn">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">MVP Scope</h2>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-red-200">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <h3 className="text-xl font-bold text-gray-900">P0: Must-Have</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">PDF ingestion & embedding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Video transcription & embedding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700"><TermHighlight>Semantic search</TermHighlight> (<TermHighlight>vector</TermHighlight> similarity)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Basic Q&A <TermHighlight>API</TermHighlight> endpoint</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Source attribution (page/timestamp)</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-200">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <h3 className="text-xl font-bold text-gray-900">P1: Should-Have</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 border-2 border-yellow-500 rounded mt-0.5 flex-shrink-0"></div>
                      <span className="text-gray-700"><TermHighlight>Hybrid search</TermHighlight> (<TermHighlight>semantic</TermHighlight> + keyword)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 border-2 border-yellow-500 rounded mt-0.5 flex-shrink-0"></div>
                      <span className="text-gray-700">Simple web UI for testing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 border-2 border-yellow-500 rounded mt-0.5 flex-shrink-0"></div>
                      <span className="text-gray-700">Query refinement suggestions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 border-2 border-yellow-500 rounded mt-0.5 flex-shrink-0"></div>
                      <span className="text-gray-700">Error handling & logging</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <h3 className="text-xl font-bold text-gray-900">P2: Nice-to-Have</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded mt-0.5 flex-shrink-0"></div>
                      <span className="text-gray-500">Conversation history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded mt-0.5 flex-shrink-0"></div>
                      <span className="text-gray-500">Conversation history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded mt-0.5 flex-shrink-0"></div>
                      <span className="text-gray-500">Video frame extraction (Phase 2)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded mt-0.5 flex-shrink-0"></div>
                      <span className="text-gray-500">PDF diagram/image understanding (Phase 2)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded mt-0.5 flex-shrink-0"></div>
                      <span className="text-gray-500"><TermHighlight>Multimodal</TermHighlight> <TermHighlight>embeddings</TermHighlight> (Phase 2)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded mt-0.5 flex-shrink-0"></div>
                      <span className="text-gray-500">Multi-language support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded mt-0.5 flex-shrink-0"></div>
                      <span className="text-gray-500">Advanced analytics dashboard</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Section 7: Tradeoffs & Risks */}
          {currentSection === 6 && (
            <div className="section-transition animate-fadeIn">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Tradeoffs & Risks</h2>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Risk</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Impact</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Mitigation Strategy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                          <span className="font-medium text-gray-900">Retrieval Quality</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">High - Poor chunks lead to wrong answers</td>
                      <td className="px-6 py-4 text-gray-700">
                        Test <TermHighlight>chunking</TermHighlight> strategies, use <TermHighlight>hybrid search</TermHighlight>, implement relevance scoring thresholds
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                          <span className="font-medium text-gray-900">LLM Hallucination</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">High - System may invent facts</td>
                      <td className="px-6 py-4 text-gray-700">
                        Enforce source attribution, use retrieval-only mode for critical queries, add confidence scores
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                          <span className="font-medium text-gray-900">Video Context Loss</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">Medium - Transcript misses visual info</td>
                      <td className="px-6 py-4 text-gray-700">
                        Include timestamp links, add video frame extraction in P2, clear user expectations
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                          <span className="font-medium text-gray-900">Scalability Limits</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">Medium - <TermHighlight>pgvector</TermHighlight> may bottleneck at scale</td>
                      <td className="px-6 py-4 text-gray-700">
                        Monitor performance, plan migration to dedicated <TermHighlight>vector</TermHighlight> DB (<TermHighlight>Pinecone</TermHighlight>, <TermHighlight>Weaviate</TermHighlight>) if needed
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                          <span className="font-medium text-gray-900">API Rate Limits</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">Low - <TermHighlight>OpenAI</TermHighlight> <TermHighlight>API</TermHighlight> throttling</td>
                      <td className="px-6 py-4 text-gray-700">
                        Implement caching, use cheaper models where possible, add retry logic with backoff
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          <span className="font-medium text-gray-900">Runaway Costs at Scale</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">Critical - $500K-$1M/day unoptimized</td>
                      <td className="px-6 py-4 text-gray-700">
                        Aggressive multi-level caching (target 80%+ hit rate), smart model routing, <TermHighlight>hybrid search</TermHighlight>, real-time cost monitoring with alerts
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          <span className="font-medium text-gray-900">Video Storage & Egress Costs</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">Critical - $225K/month egress alone at scale</td>
                      <td className="px-6 py-4 text-gray-700">
                        Transcript-first approach (96% storage reduction), <TermHighlight>Cloudflare</TermHighlight> Stream for Pro tier (egress included), intelligent tiering (hot → warm → archive), lazy loading (only 20% load videos)
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                          <span className="font-medium text-gray-900">Multi-Tenant Data Isolation</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">High - Data leakage between factories</td>
                      <td className="px-6 py-4 text-gray-700">
                        Database-per-tenant for large customers, strict tenant_id filtering in queries, automated security audits
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                          <span className="font-medium text-gray-900">Regional Data Residency</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">High - GDPR, China regulations</td>
                      <td className="px-6 py-4 text-gray-700">
                        Deploy regional clusters (US, EU, APAC), keep tenant data in their region, separate China deployment on Alibaba Cloud
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                          <span className="font-medium text-gray-900">Cache Invalidation</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">Medium - Stale responses after doc updates</td>
                      <td className="px-6 py-4 text-gray-700">
                        Version <TermHighlight>embeddings</TermHighlight>, <TermHighlight>TTL</TermHighlight>-based expiration, manual cache invalidation <TermHighlight>API</TermHighlight>, re-index on document updates
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-orange-500" />
                          <span className="font-medium text-gray-900">Embedding Generation Bottleneck</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">High - 6M embeddings/day, API rate limits, latency</td>
                      <td className="px-6 py-4 text-gray-700">
                        Self-host <TermHighlight>embedding</TermHighlight> models (<TermHighlight>all-MiniLM-L6-v2</TermHighlight>), edge deployment (<TermHighlight>Cloudflare</TermHighlight> <TermHighlight>Workers</TermHighlight>), batch pre-computation, connection pooling
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-orange-500" />
                          <span className="font-medium text-gray-900">Vector DB Performance at Scale</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">High - <TermHighlight>pgvector</TermHighlight> degrades with 10M+ <TermHighlight>vector</TermHighlight>s, index rebuilds block queries</td>
                      <td className="px-6 py-4 text-gray-700">
                        Migrate to <TermHighlight>Qdrant</TermHighlight>/<TermHighlight>Weaviate</TermHighlight> at scale, connection pooling (<TermHighlight>PgBouncer</TermHighlight>), read replicas, database partitioning
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                          <span className="font-medium text-gray-900">API Rate Limits</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">High - Need 50+ <TermHighlight>OpenAI</TermHighlight> accounts, failover complexity</td>
                      <td className="px-6 py-4 text-gray-700">
                        Multi-account load balancing, automatic failover to backup accounts/providers, request queuing, self-hosted fallback (<TermHighlight>Llama</TermHighlight> 3.1)
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                          <span className="font-medium text-gray-900">Ingestion Pipeline Bottlenecks</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">Medium - Video processing queue depth, re-indexing overhead</td>
                      <td className="px-6 py-4 text-gray-700">
                        Async processing with queues, incremental re-indexing (only changed chunks), auto-scaling GPU workers, batch processing
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                          <span className="font-medium text-gray-900">Cold Start for New Tenants</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">Medium - Zero cache → 10x higher cost, 2-3s latency</td>
                      <td className="px-6 py-4 text-gray-700">
                        Pre-computed FAQs during onboarding, cross-tenant learning (similar factories), progressive cache warming, onboarding flow
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                          <span className="font-medium text-gray-900">Monitoring & Observability Costs</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">Medium - $380/month for logs/metrics/traces at scale</td>
                      <td className="px-6 py-4 text-gray-700">
                        Sampling (10% of requests), log retention policies, structured logging (compression), self-hosted (Grafana + Loki + Prometheus)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section 8: Vision Capabilities */}
          {currentSection === 7 && (
            <div className="section-transition animate-fadeIn">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Phase 2: Vision-Powered Understanding</h2>
              
              <div className="space-y-8">
                {/* Vision Architecture Diagram */}
                <div className="bg-white rounded-2xl shadow-xl p-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Vision Enhancement Architecture</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                        <Video className="w-8 h-8 text-blue-600 mb-3" />
                        <h4 className="font-bold text-gray-900 mb-2">Video Frame Extraction</h4>
                        <p className="text-sm text-gray-700">Extract keyframes every N seconds or at scene changes</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
                        <ImageIcon className="w-8 h-8 text-purple-600 mb-3" />
                        <h4 className="font-bold text-gray-900 mb-2">PDF Image Extraction</h4>
                        <p className="text-sm text-gray-700">Extract diagrams, schematics, part photos from PDFs</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
                        <Eye className="w-8 h-8 text-green-600 mb-3" />
                        <h4 className="font-bold text-gray-900 mb-2">Vision Model</h4>
                        <p className="text-sm text-gray-700">GPT-4 Vision or Claude to generate descriptions</p>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <ArrowRight className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex justify-center">
                      <div className="bg-indigo-50 rounded-lg p-6 border-2 border-indigo-200 w-64">
                        <Layers className="w-8 h-8 text-indigo-600 mb-3" />
                        <h4 className="font-bold text-gray-900 mb-2"><TermHighlight>Multimodal</TermHighlight> Indexing</h4>
                        <p className="text-sm text-gray-700">Visual descriptions indexed alongside transcripts</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Capabilities */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Video className="w-6 h-6 text-primary-600" />
                      <h3 className="text-xl font-bold text-gray-900">Video Frame Analysis</h3>
                    </div>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>Extract keyframes every N seconds or at scene changes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>Use <TermHighlight>GPT-4</TermHighlight> Vision or <TermHighlight>Claude</TermHighlight> to generate descriptions: "technician removing back panel", "pressure gauge showing 15 PSI"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>Index these descriptions alongside transcripts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>Better handling of "show me how to..." queries</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <ImageIcon className="w-6 h-6 text-primary-600" />
                      <h3 className="text-xl font-bold text-gray-900">PDF Diagram Understanding</h3>
                    </div>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>Extract images from PDFs (diagrams, schematics, part photos)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>Use vision models to describe: "exploded view diagram of steam valve assembly"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>Makes visual technical documentation searchable</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Layers className="w-6 h-6 text-primary-600" />
                      <h3 className="text-xl font-bold text-gray-900"><TermHighlight>Multimodal</TermHighlight> <TermHighlight>Embeddings</TermHighlight></h3>
                    </div>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>Use <TermHighlight>CLIP</TermHighlight> or similar to create <TermHighlight>embeddings</TermHighlight> that work across text AND images</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>Query: "where is the pressure release valve" matches both text descriptions AND actual photos of the valve</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Comparison Card */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">MVP vs Phase 2 Comparison</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
                      <h4 className="font-bold text-gray-900 mb-4 text-lg">MVP (Text-Only)</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-gray-500 mt-1">•</span>
                          <span>Transcript search</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-500 mt-1">•</span>
                          <span>"Check manual page 5"</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-500 mt-1">•</span>
                          <span>Misses visual-only steps</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-500 mt-1">•</span>
                          <span className="font-semibold">~80% query coverage</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-primary-50 rounded-lg p-6 border-2 border-primary-500">
                      <h4 className="font-bold text-gray-900 mb-4 text-lg">Phase 2 (Vision-Enhanced)</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Transcript + visual search</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>"Here's a screenshot showing the exact location"</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Captures everything</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span className="font-semibold">~95% query coverage</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Why Vision Matters for Machinists */}
                <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Why Vision is Especially Valuable for Machinists</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span><strong>Technical diagrams</strong> are core to troubleshooting - vision makes these searchable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span><strong>"Show me" queries</strong> are common - users want to see procedures, not just read about them</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span><strong>Part identification</strong> from photos - "what is this component?" queries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span><strong>Visual confirmation</strong> of procedures - seeing the correct setup vs. just text description</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Section 10: Live Demo */}
          {currentSection === 9 && (
            <div className="section-transition animate-fadeIn">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Live Demo</h2>
              <p className="text-gray-600 mb-8">Interactive preview of the Q&A system interface</p>
              
              <ChatDemo />
            </div>
          )}

          {/* Section 9: Tech Stack & Next Steps */}
          {currentSection === 8 && (
            <div className="section-transition animate-fadeIn">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Tech Stack & Next Steps</h2>
              
              <div className="space-y-8">
                {/* Tech Stack */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Technology Stack</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <TechCard icon={Code} name="Python" description={<><TermHighlight>FastAPI</TermHighlight>, LangChain</>} />
                    <TechCard icon={Database} name={<TermHighlight>PostgreSQL</TermHighlight>} description={<><TermHighlight>pgvector</TermHighlight> extension</>} />
                    <TechCard icon={Brain} name={<TermHighlight>OpenAI</TermHighlight>} description={<><TermHighlight>GPT-4</TermHighlight>, <TermHighlight>Embeddings</TermHighlight></>} />
                    <TechCard icon={FileText} name={<TermHighlight>PyPDF2</TermHighlight>} description="PDF processing" />
                    <TechCard icon={Video} name={<TermHighlight>Whisper</TermHighlight>} description="Video transcription" />
                    <TechCard icon={Zap} name={<TermHighlight>React</TermHighlight>} description="Frontend UI" />
                    <TechCard icon={Shield} name="Docker" description="Containerization" />
                    <TechCard icon={Database} name="SQLAlchemy" description="ORM" />
                    <TechCard icon={Eye} name={<><TermHighlight>GPT-4</TermHighlight> Vision</>} description="Phase 2: Image analysis" />
                    <TechCard icon={ImageIcon} name={<><TermHighlight>OpenCV</TermHighlight>/<TermHighlight>FFmpeg</TermHighlight></>} description="Phase 2: Frame extraction" />
                    <TechCard icon={Layers} name={<TermHighlight>CLIP</TermHighlight>} description={<>Phase 2: <TermHighlight>Multimodal</TermHighlight> <TermHighlight>embeddings</TermHighlight></>} />
                  </div>
                </div>

                {/* Next Steps */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Implementation Timeline</h3>
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="space-y-6">
                      <TimelineStep 
                        number="1"
                        title="Week 1: Foundation"
                        items={[<>Set up <TermHighlight>PostgreSQL</TermHighlight> + <TermHighlight>pgvector</TermHighlight> (single tenant)</>, "Build PDF ingestion pipeline", <>Implement basic <TermHighlight>embedding</TermHighlight> storage</>, "Single-tenant MVP deployment"]}
                      />
                      <TimelineStep 
                        number="2"
                        title="Week 2: Video & Search"
                        items={["Add video transcription pipeline", <>Implement <TermHighlight>hybrid search</TermHighlight></>, "Build retrieval orchestration", <>Add <TermHighlight>Redis</TermHighlight> caching layer</>]}
                      />
                      <TimelineStep 
                        number="3"
                        title="Week 3: API & UI"
                        items={[<>Create <TermHighlight>FastAPI</TermHighlight> endpoints</>, "Build response generation with model routing", "Develop simple web UI", "Implement multi-tenant architecture"]}
                      />
                      <TimelineStep 
                        number="4"
                        title="Week 4: Polish & Deploy"
                        items={["Add error handling", "Deploy to staging", "User testing"]}
                      />
                      <TimelineStep 
                        number="5"
                        title="Phase 2: Vision Enhancement (Post-MVP)"
                        items={["Implement video frame extraction", "Add PDF image extraction", <>Integrate <TermHighlight>GPT-4</TermHighlight> Vision <TermHighlight>API</TermHighlight></>, <>Build <TermHighlight>multimodal</TermHighlight> indexing</>, "Test vision-enhanced queries"]}
                      />
                    </div>
                  </div>
                </div>

                {/* Open Questions */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Open Questions for Stakeholders</h3>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-600 font-bold mt-1">Q:</span>
                        <span>What is the expected query volume? (affects caching strategy)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-600 font-bold mt-1">Q:</span>
                        <span>Do we need multi-user support or single-user MVP?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-600 font-bold mt-1">Q:</span>
                        <span>What is the accuracy threshold? (affects retrieval strategy)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-600 font-bold mt-1">Q:</span>
                        <span>Are there plans to add more documents/videos? (affects scalability planning)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
            <button
              onClick={prevSection}
              disabled={currentSection === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                currentSection === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              {t('common.previous')}
            </button>
            
            <div className="text-sm text-gray-600">
              {language === 'en' ? 'Section' : 'Section'} {currentSection + 1} {language === 'en' ? 'of' : 'sur'} {currentSections.length}
            </div>
            
            <button
              onClick={nextSection}
              disabled={currentSection === currentSections.length - 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                currentSection === currentSections.length - 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md'
              }`}
            >
              {t('common.next')}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

function InteractiveArchitectureComponent({ icon: Icon, title, description, details, color, componentId, onClick, language = 'en' }) {
  const [isHovered, setIsHovered] = useState(false)
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }
  
  return (
    <div 
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className={`${color} text-white rounded-xl p-6 w-72 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 relative z-10 ${onClick ? 'hover:ring-4 hover:ring-white/50' : ''}`}>
        <Icon className="w-10 h-10 mb-3" />
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90 mb-2">{description}</p>
        {onClick && (
          <p className="text-xs opacity-75 mt-2 italic">{t('common.clickToSeeDetails')}</p>
        )}
        {isHovered && (
          <div className="mt-3 pt-3 border-t border-white/30 animate-fadeIn">
            <p className="text-xs opacity-95 leading-relaxed">{details}</p>
          </div>
        )}
      </div>
      {/* Tooltip-like effect */}
      {isHovered && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white opacity-90 z-20"></div>
      )}
    </div>
  )
}

function DecisionCard({ id, title, decision, pros, cons, rationale, expanded, onToggle }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full text-left p-6 focus:outline-none"
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <ChevronRight 
            className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`}
          />
        </div>
        <p className="text-primary-600 font-semibold mb-3">{decision}</p>
        {expanded && (
          <div className="mt-4 space-y-4 animate-fadeIn">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Pros
              </h4>
              <ul className="space-y-1 text-sm text-gray-700">
                {pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                Cons
              </h4>
              <ul className="space-y-1 text-sm text-gray-700">
                {cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">⚠</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Rationale: </span>
                {rationale}
              </p>
            </div>
          </div>
        )}
      </button>
    </div>
  )
}

function TechCard({ icon: Icon, name, description }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
      <Icon className="w-10 h-10 text-primary-600 mx-auto mb-3" />
      <h4 className="font-bold text-gray-900 mb-1">{name}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

const mediaFiles = {
  pdfs: [
    { name: 'CoffeeBig.pdf', displayName: 'Coffee Machine Manual (Big)', path: '/media/CoffeeBig.pdf' },
    { name: 'CoffeeChurch.pdf', displayName: 'Coffee Church Guide', path: '/media/CoffeeChurch.pdf' }
  ],
  videos: [
    { name: 'CofeeBig.mp4', displayName: 'Coffee Machine Tutorial', path: '/media/CofeeBig.mp4' },
    { name: 'CoffeeNes.MOV', displayName: 'Nespresso Setup Guide', path: '/media/CoffeeNes.MOV' }
  ]
}

// Mock responses for the demo
const mockResponses = {
  'how do i clean the steam wand': {
    answer: 'To clean the steam wand, follow these steps:\n\n1. Wipe the wand with a damp cloth immediately after use\n2. Purge steam for 2-3 seconds to clear any milk residue\n3. Use a cleaning brush weekly to remove buildup\n4. Soak the tip in warm water if clogged',
    sources: [
      { type: 'pdf', name: mediaFiles.pdfs[0].displayName, filename: mediaFiles.pdfs[0].name, page: 12, path: mediaFiles.pdfs[0].path },
      { type: 'video', name: mediaFiles.videos[0].displayName, filename: mediaFiles.videos[0].name, timestamp: '3:45', path: mediaFiles.videos[0].path }
    ],
    confidence: 0.95
  },
  'what is the recommended water temperature': {
    answer: 'The recommended water temperature for optimal coffee extraction is between 195°F and 205°F (90°C to 96°C).\n\nThis temperature range ensures:\n- Proper extraction of coffee compounds\n- Balanced flavor profile\n- Optimal crema formation',
    sources: [
      { type: 'pdf', name: mediaFiles.pdfs[0].displayName, filename: mediaFiles.pdfs[0].name, page: 8, path: mediaFiles.pdfs[0].path },
      { type: 'pdf', name: mediaFiles.pdfs[1].displayName, filename: mediaFiles.pdfs[1].name, page: 3, path: mediaFiles.pdfs[1].path }
    ],
    confidence: 0.92
  },
  'how to adjust the grinder': {
    answer: 'To adjust the grinder:\n\n1. Turn the machine off and unplug it\n2. Remove the hopper to access the burr adjustment ring\n3. Turn clockwise for finer grind (smaller numbers)\n4. Turn counterclockwise for coarser grind (larger numbers)\n5. Make small adjustments (1-2 clicks at a time)\n6. Test with a shot and adjust as needed',
    sources: [
      { type: 'video', name: mediaFiles.videos[0].displayName, filename: mediaFiles.videos[0].name, timestamp: '5:20', path: mediaFiles.videos[0].path },
      { type: 'pdf', name: mediaFiles.pdfs[0].displayName, filename: mediaFiles.pdfs[0].name, page: 18, path: mediaFiles.pdfs[0].path }
    ],
    confidence: 0.88
  },
  'why is my espresso too bitter': {
    answer: 'Bitter espresso can be caused by several factors:\n\n**Common causes:**\n- Over-extraction (grind too fine or shot too long)\n- Water temperature too high\n- Stale coffee beans\n- Dirty machine components\n\n**Solutions:**\n- Coarsen the grind slightly\n- Reduce shot time to 25-30 seconds\n- Check water temperature (should be 195-205°F)\n- Clean the group head and portafilter',
    sources: [
      { type: 'pdf', name: mediaFiles.pdfs[1].displayName, filename: mediaFiles.pdfs[1].name, page: 15, path: mediaFiles.pdfs[1].path },
      { type: 'video', name: mediaFiles.videos[1].displayName, filename: mediaFiles.videos[1].name, timestamp: '8:10', path: mediaFiles.videos[1].path }
    ],
    confidence: 0.90
  },
  'default': {
    answer: 'I found information about your query. Based on the available documentation:\n\nThe system uses advanced semantic search to find relevant information from both PDF manuals and video tutorials. For more specific answers, try rephrasing your question or asking about:\n\n- Machine maintenance procedures\n- Brewing parameters and settings\n- Troubleshooting common issues\n- Component specifications',
    sources: [
      { type: 'pdf', name: mediaFiles.pdfs[0].displayName, filename: mediaFiles.pdfs[0].name, page: 1, path: mediaFiles.pdfs[0].path }
    ],
    confidence: 0.75
  }
}

function ChatDemo() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I can help you find information about coffee machine operation, maintenance, and troubleshooting. What would you like to know?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [viewingMedia, setViewingMedia] = useState(null) // { type: 'pdf'|'video', path, name, page?, timestamp? }
  const [suggestedQueries] = useState([
    'How do I clean the steam wand?',
    'What is the recommended water temperature?',
    'How to adjust the grinder?',
    'Why is my espresso too bitter?'
  ])

  const handleSend = async (query) => {
    const queryText = query || input.trim()
    if (!queryText) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: queryText,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Get mock response
    const queryLower = queryText.toLowerCase()
    let response = mockResponses.default
    
    for (const [key, value] of Object.entries(mockResponses)) {
      if (queryLower.includes(key.toLowerCase())) {
        response = value
        break
      }
    }

    // Add assistant response
    const assistantMessage = {
      id: messages.length + 2,
      type: 'assistant',
      content: response.answer,
      sources: response.sources,
      confidence: response.confidence,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, assistantMessage])
    setIsLoading(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="flex flex-col h-[700px]">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6" />
            <div>
              <h3 className="font-bold text-lg">Coffee Machine Assistant</h3>
              <p className="text-sm text-primary-100">Powered by RAG • 2 PDFs • 2 Videos</p>
            </div>
          </div>
        </div>

        {/* Main Content Area - Split when media is open */}
        <div className={`flex flex-1 overflow-hidden ${viewingMedia ? 'flex-row' : 'flex-col'}`}>
          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 ${viewingMedia ? 'w-1/2 border-r border-gray-200' : ''}`}>
            {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-lg p-4 ${
                  message.type === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-900 shadow-md'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                
                {message.sources && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="text-xs font-semibold text-gray-600 mb-2">Sources:</div>
                    <div className="space-y-1">
                      {message.sources.map((source, idx) => (
                        <button
                          key={idx}
                          onClick={() => setViewingMedia({
                            type: source.type,
                            path: source.path,
                            name: source.name,
                            page: source.page,
                            timestamp: source.timestamp
                          })}
                          className="w-full flex items-center gap-2 text-xs hover:bg-gray-50 p-2 rounded transition-colors group text-left"
                        >
                          {source.type === 'pdf' ? (
                            <FileText className="w-3 h-3 text-green-600 group-hover:text-green-700" />
                          ) : (
                            <Video className="w-3 h-3 text-red-600 group-hover:text-red-700" />
                          )}
                          <span className="text-gray-700 group-hover:text-primary-600 flex-1">
                            {source.name}
                            {source.page && ` • Page ${source.page}`}
                            {source.timestamp && ` • ${source.timestamp}`}
                          </span>
                          <span className="text-gray-400 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                            View →
                          </span>
                        </button>
                      ))}
                    </div>
                    {message.confidence && (
                      <div className="mt-2 text-xs text-gray-500">
                        Confidence: {Math.round(message.confidence * 100)}%
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Available Documents */}
          {!viewingMedia && (
            <div className="px-6 pt-4 pb-2 border-t border-gray-200 bg-white flex-shrink-0">
              <div className="text-xs font-semibold text-gray-600 mb-2">Available Documents:</div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {mediaFiles.pdfs.map((pdf, idx) => (
                  <button
                    key={idx}
                    onClick={() => setViewingMedia({ type: 'pdf', path: pdf.path, name: pdf.displayName })}
                    className="flex items-center gap-2 text-xs px-3 py-2 bg-green-50 hover:bg-green-100 text-gray-700 rounded-lg transition-colors group border border-green-200 text-left"
                  >
                    <FileText className="w-4 h-4 text-green-600" />
                    <span className="flex-1 truncate">{pdf.displayName}</span>
                    <span className="text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </button>
                ))}
                {mediaFiles.videos.map((video, idx) => (
                  <button
                    key={idx}
                    onClick={() => setViewingMedia({ type: 'video', path: video.path, name: video.displayName })}
                    className="flex items-center gap-2 text-xs px-3 py-2 bg-red-50 hover:bg-red-100 text-gray-700 rounded-lg transition-colors group border border-red-200 text-left"
                  >
                    <Video className="w-4 h-4 text-red-600" />
                    <span className="flex-1 truncate">{video.displayName}</span>
                    <span className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Queries */}
          {!viewingMedia && messages.length === 1 && (
            <div className="px-6 pt-2 pb-2 border-t border-gray-200 bg-white flex-shrink-0">
              <div className="text-xs font-semibold text-gray-600 mb-2">Try asking:</div>
              <div className="flex flex-wrap gap-2">
                {suggestedQueries.map((query, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(query)}
                    className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Media Viewer Panel */}
          {viewingMedia && (
            <div className="w-1/2 flex flex-col bg-white border-l border-gray-200">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {viewingMedia.type === 'pdf' ? (
                  <FileText className="w-5 h-5 text-green-600" />
                ) : (
                  <Video className="w-5 h-5 text-red-600" />
                )}
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{viewingMedia.name}</h4>
                  {viewingMedia.page && (
                    <p className="text-xs text-gray-500">Page {viewingMedia.page}</p>
                  )}
                  {viewingMedia.timestamp && (
                    <p className="text-xs text-gray-500">Timestamp: {viewingMedia.timestamp}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setViewingMedia(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close viewer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-gray-100 p-4">
              {viewingMedia.type === 'pdf' ? (
                <iframe
                  src={`${viewingMedia.path}#page=${viewingMedia.page || 1}`}
                  className="w-full h-full min-h-[500px] border border-gray-300 rounded-lg bg-white"
                  title={viewingMedia.name}
                />
              ) : (
                <div className="w-full">
                  <video
                    src={viewingMedia.path}
                    controls
                    className="w-full rounded-lg shadow-lg"
                    onLoadedMetadata={(e) => {
                      if (viewingMedia.timestamp) {
                        const [minutes, seconds] = viewingMedia.timestamp.split(':').map(Number)
                        const timeInSeconds = minutes * 60 + seconds
                        e.target.currentTime = timeInSeconds
                      }
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question about coffee machines..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Send
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500 text-center">
            This is a demo with mocked responses. Real system would query actual knowledge base.
          </div>
        </div>
      </div>
    </div>
  )
}

function TimelineStep({ number, title, items }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
          {number}
        </div>
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
        <ul className="space-y-1">
          {items.map((item, i) => (
            <li key={i} className="text-gray-700 text-sm flex items-start gap-2">
              <span className="text-primary-600 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App

