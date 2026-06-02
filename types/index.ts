export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: ChatMetadata;
}

export interface ChatMetadata {
  model?: string;
  tokens?: number;
  processingTime?: number;
  error?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  isArchived: boolean;
}

export interface ChatState {
  sessions: ChatSession[];
  activeSessionId: string | null;
  isStreaming: boolean;
  error: string | null;
}

export interface AppSettings {
  theme: 'dark' | 'light';
  language: 'es' | 'en';
  fontSize: 'small' | 'medium' | 'large';
  sidebarCollapsed: boolean;
  notificationsEnabled: boolean;
}

export interface IDEState {
  activeTab: IDETab;
  files: FileNode[];
  activeFile: string | null;
  code: string;
  output: string;
  errors: string[];
}

export type IDETab = 
  | 'comparador-carpetas'
  | 'comparador-codigo'
  | 'corregir-codigo'
  | 'corregir-dependencias'
  | 'corregir-importaciones'
  | 'esquema-carpetas'
  | 'generador-componentes'
  | 'generar-icono'
  | 'formateador-codigo';

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
  content?: string;
  language?: string;
}

export interface APIEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  parameters: APIParameter[];
  responses: APIResponse[];
  headers: Record<string, string>;
  body?: string;
}

export interface APIParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue?: string;
}

export interface APIResponse {
  statusCode: number;
  description: string;
  schema: Record<string, unknown>;
}

export interface AppGenerator {
  name: string;
  description: string;
  structure: AppStructure;
  components: AppComponent[];
  api: APIEndpoint[];
  configuration: Record<string, unknown>;
}

export interface AppStructure {
  folders: string[];
  files: string[];
  dependencies: Record<string, string>;
}

export interface AppComponent {
  name: string;
  type: 'page' | 'component' | 'layout' | 'api';
  path: string;
  code: string;
  props?: Record<string, unknown>;
}

export interface StructurePlan {
  id: string;
  name: string;
  description: string;
  items: StructureItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface StructureItem {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'component' | 'api';
  parentId: string | null;
  order: number;
  metadata?: Record<string, unknown>;
}

export interface PreviewState {
  url: string;
  isActive: boolean;
  device: 'desktop' | 'tablet' | 'mobile';
  zoom: number;
}

export interface ComponentLibrary {
  id: string;
  name: string;
  description: string;
  category: string;
  code: string;
  preview: string;
  tags: string[];
}

export interface ExplorerState {
  currentPath: string;
  files: FileNode[];
  selectedFile: string | null;
  searchQuery: string;
  viewMode: 'grid' | 'list';
}

export interface APITesterState {
  endpoints: APIEndpoint[];
  activeEndpoint: string | null;
  response: APIResponse | null;
  isLoading: boolean;
  history: APIRequestHistory[];
}

export interface APIRequestHistory {
  id: string;
  endpointId: string;
  request: {
    method: string;
    path: string;
    headers: Record<string, string>;
    body?: string;
  };
  response: {
    statusCode: number;
    body: string;
    headers: Record<string, string>;
  };
  timestamp: Date;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
}

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
    warning: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ModalConfig {
  isOpen: boolean;
  title: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClose: () => void;
  children?: React.ReactNode;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  field: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan';
  value: string | number | boolean;
}

export interface SearchResult {
  id: string;
  type: 'file' | 'component' | 'api' | 'chat' | 'user';
  title: string;
  description: string;
  path: string;
  score: number;
  highlights: string[];
}

export interface KeyboardShortcut {
  key: string;
  modifiers: {
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    meta?: boolean;
  };
  action: string;
  description: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export interface LoadingState {
  isLoading: boolean;
  loadingText?: string;
  progress?: number;
}

export interface EmptyState {
  title: string;
  description: string;
  icon?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ConfirmDialog {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  variant: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

export interface DropdownItem {
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
  divider?: boolean;
  onClick?: () => void;
}

export interface TabConfig {
  id: string;
  label: string;
  icon?: string;
  content: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

export interface TooltipConfig {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  maxWidth?: number;
}

export interface ProgressBarConfig {
  value: number;
  max: number;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

export interface BadgeConfig {
  text: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

export interface AvatarConfig {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

export interface CardConfig {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  icon?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
  actions?: DropdownItem[];
}

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: string;
  disabled?: boolean;
}

export interface TabsConfig {
  items: TabConfig[];
  defaultTab?: string;
  variant?: 'underline' | 'pills' | 'buttons';
  orientation?: 'horizontal' | 'vertical';
  onChange?: (tabId: string) => void;
}

export interface StepperConfig {
  steps: StepperStep[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'numbers' | 'icons' | 'dots';
}

export interface StepperStep {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  status?: 'completed' | 'current' | 'pending' | 'error';
}

export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  date: Date;
  icon?: string;
  color?: string;
  status?: 'completed' | 'current' | 'pending';
}

export interface DataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

export interface DataTableConfig {
  columns: DataTableColumn[];
  data: Record<string, unknown>[];
  pagination?: PaginationState;
  sort?: SortConfig;
  filters?: FilterConfig[];
  onSort?: (sort: SortConfig) => void;
  onFilter?: (filters: FilterConfig[]) => void;
  onPageChange?: (page: number) => void;
  onRowClick?: (row: Record<string, unknown>) => void;
  isLoading?: boolean;
  emptyState?: EmptyState;
  selectable?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'file' | 'date';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  options?: { label: string; value: string }[];
  validation?: Record<string, unknown>;
  defaultValue?: unknown;
  helpText?: string;
  errorMessage?: string;
}

export interface FormConfig {
  fields: FormField[];
  onSubmit: (data: Record<string, unknown>) => void;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  isLoading?: boolean;
  layout?: 'vertical' | 'horizontal' | 'inline';
  size?: 'sm' | 'md' | 'lg';
}

export interface Notification {
  id: string;
  type: 'message' | 'alert' | 'update' | 'reminder';
  title: string;
  body: string;
  icon?: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  image?: string;
}

export interface NotificationCenter {
  notifications: Notification[];
  unreadCount: number;
  isOpen: boolean;
  onToggle: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClear: () => void;
}

export interface SearchConfig {
  placeholder?: string;
  onSearch: (query: string) => void;
  onClear?: () => void;
  results?: SearchResult[];
  isLoading?: boolean;
  debounceMs?: number;
  minChars?: number;
  recentSearches?: string[];
  suggestions?: string[];
}

export interface FileUploadConfig {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  onUpload: (files: File[]) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  dragAndDrop?: boolean;
}

export interface CodeEditorConfig {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  theme?: 'dark' | 'light';
  readOnly?: boolean;
  minimap?: boolean;
  lineNumbers?: boolean;
  wordWrap?: boolean;
  fontSize?: number;
  tabSize?: number;
  height?: string;
  width?: string;
}

export interface MarkdownConfig {
  content: string;
  className?: string;
  allowHtml?: boolean;
  linkTarget?: string;
  imageBaseUrl?: string;
  onLinkClick?: (href: string) => void;
}

export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'scatter';
  data: ChartData;
  options?: Record<string, unknown>;
  width?: string;
  height?: string;
  responsive?: boolean;
  animation?: boolean;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  fill?: boolean;
  tension?: number;
}

export interface MapConfig {
  center: [number, number];
  zoom: number;
  markers?: MapMarker[];
  onMarkerClick?: (marker: MapMarker) => void;
  style?: 'streets' | 'satellite' | 'dark';
}

export interface MapMarker {
  id: string;
  position: [number, number];
  title: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface CalendarConfig {
  events: CalendarEvent[];
  view?: 'month' | 'week' | 'day';
  onEventClick?: (event: CalendarEvent) => void;
  onDateSelect?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  color?: string;
  allDay?: boolean;
  location?: string;
}

export interface RichTextConfig {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  height?: string;
  toolbar?: RichTextToolbar[];
}

export type RichTextToolbar = 
  | 'bold' 
  | 'italic' 
  | 'underline' 
  | 'strike' 
  | 'heading' 
  | 'list' 
  | 'link' 
  | 'image' 
  | 'code' 
  | 'quote' 
  | 'align' 
  | 'color' 
  | 'clear';

export interface VideoPlayerConfig {
  src: string;
  poster?: string;
  width?: string;
  height?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onError?: (error: string) => void;
}

export interface AudioPlayerConfig {
  src: string;
  title?: string;
  artist?: string;
  cover?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

export interface CarouselConfig {
  items: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  infinite?: boolean;
  pauseOnHover?: boolean;
}

export interface CarouselItem {
  id: string;
  image: string;
  title?: string;
  description?: string;
  link?: string;
}

export interface GalleryConfig {
  images: GalleryImage[];
  columns?: number;
  gap?: number;
  lightbox?: boolean;
  onImageClick?: (image: GalleryImage) => void;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
}

export interface ParallaxConfig {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}

export interface AnimationConfig {
  type: 'fade' | 'slide' | 'scale' | 'rotate' | 'bounce' | 'flip';
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  delay?: number;
  once?: boolean;
  children: React.ReactNode;
  className?: string;
}

export interface IntersectionObserverConfig {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  onIntersect?: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface LazyLoadConfig {
  src: string;
  alt: string;
  placeholder?: string;
  width?: number;
  height?: number;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export interface VirtualScrollConfig {
  items: unknown[];
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
  renderItem: (item: unknown, index: number) => React.ReactNode;
  onEndReached?: () => void;
  endReachedThreshold?: number;
}

export interface InfiniteScrollConfig {
  loadMore: () => void;
  hasMore: boolean;
  loader?: React.ReactNode;
  endMessage?: React.ReactNode;
  threshold?: number;
  children: React.ReactNode;
}

export interface DragAndDropConfig {
  onDragStart?: (data: unknown) => void;
  onDragOver?: (event: React.DragEvent) => void;
  onDrop?: (data: unknown) => void;
  onDragEnd?: () => void;
  accept?: string[];
  multiple?: boolean;
  disabled?: boolean;
}

export interface ResizableConfig {
  defaultWidth?: number;
  defaultHeight?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  aspectRatio?: number;
  handles?: ('n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw')[];
  onResize?: (size: { width: number; height: number }) => void;
  children: React.ReactNode;
}

export interface SplitPaneConfig {
  direction?: 'horizontal' | 'vertical';
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  primary?: 'first' | 'second';
  onResize?: (size: number) => void;
  children: [React.ReactNode, React.ReactNode];
}

export interface ContextMenuConfig {
  items: ContextMenuItem[];
  position: { x: number; y: number };
  onClose: () => void;
}

export interface ContextMenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  divider?: boolean;
  onClick?: () => void;
  children?: ContextMenuItem[];
}

export interface ToolbarConfig {
  items: ToolbarItem[];
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'ghost';
}

export interface ToolbarItem {
  id: string;
  label: string;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
  tooltip?: string;
  badge?: string | number;
}

export interface StatusBarConfig {
  items: StatusBarItem[];
  position?: 'top' | 'bottom';
}

export interface StatusBarItem {
  id: string;
  label: string;
  icon?: string;
  onClick?: () => void;
  color?: string;
  tooltip?: string;
}

export interface PanelConfig {
  id: string;
  title: string;
  icon?: string;
  defaultOpen?: boolean;
  collapsible?: boolean;
  resizable?: boolean;
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
  children: React.ReactNode;
}

export interface DockConfig {
  items: DockItem[];
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg';
  autoHide?: boolean;
}

export interface DockItem {
  id: string;
  label: string;
  icon: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  tooltip?: string;
  badge?: string | number;
}

export interface CommandPaletteConfig {
  isOpen: boolean;
  onClose: () => void;
  commands: CommandPaletteItem[];
  placeholder?: string;
  groups?: CommandPaletteGroup[];
}

export interface CommandPaletteItem {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  shortcut?: string;
  group?: string;
  onClick: () => void;
}

export interface CommandPaletteGroup {
  id: string;
  label: string;
  items: CommandPaletteItem[];
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  shortcut?: string;
  onClick: () => void;
  color?: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  description: string;
  timestamp: Date;
  user?: string;
  icon?: string;
  color?: string;
}

export interface AuditLog extends ActivityLog {
  ip?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

export interface WebSocketMessage {
  type: string;
  payload: unknown;
  timestamp: Date;
  userId?: string;
}

export interface SSEEvent {
  type: string;
  data: unknown;
  id?: string;
  retry?: number;
}

export interface CacheConfig {
  key: string;
  value: unknown;
  ttl?: number;
  tags?: string[];
}

export interface RateLimitConfig {
  windowMs: number;
  max: number;
  message?: string;
  statusCode?: number;
  keyGenerator?: (req: Request) => string;
}

export interface LoggerConfig {
  level: 'debug' | 'info' | 'warn' | 'error';
  format?: 'json' | 'text';
  output?: 'console' | 'file' | 'database';
  filePath?: string;
  maxSize?: number;
  maxFiles?: number;
}

export interface MetricsConfig {
  enabled: boolean;
  prefix?: string;
  labels?: Record<string, string>;
  buckets?: number[];
  percentiles?: number[];
}

export interface HealthCheckConfig {
  path: string;
  checks: HealthCheck[];
  interval?: number;
}

export interface HealthCheck {
  name: string;
  check: () => Promise<boolean>;
  timeout?: number;
  critical?: boolean;
}

export interface MonitoringConfig {
  enabled: boolean;
  provider: 'datadog' | 'newrelic' | 'sentry' | 'custom';
  apiKey?: string;
  appName?: string;
  environment?: string;
  sampleRate?: number;
}

export interface FeatureFlag {
  key: string;
  enabled: boolean;
  description?: string;
  rules?: FeatureFlagRule[];
}

export interface FeatureFlagRule {
  type: 'percentage' | 'user' | 'group' | 'country' | 'custom';
  value: string | number | string[];
}

export interface ABTest {
  id: string;
  name: string;
  variants: ABTestVariant[];
  traffic: number;
  metrics: string[];
  startDate: Date;
  endDate?: Date;
}

export interface ABTestVariant {
  id: string;
  name: string;
  weight: number;
  config: Record<string, unknown>;
}

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
  timestamp?: Date;
  userId?: string;
  sessionId?: string;
}

export interface AnalyticsConfig {
  provider: 'google' | 'mixpanel' | 'amplitude' | 'custom';
  apiKey?: string;
  enabled: boolean;
  debug?: boolean;
  anonymizeIp?: boolean;
}

export interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterSite?: string;
  noIndex?: boolean;
  structuredData?: Record<string, unknown>;
}

export interface MetaTags {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  robots?: string;
  viewport?: string;
  charset?: string;
  og?: OpenGraphTags;
  twitter?: TwitterTags;
}

export interface OpenGraphTags {
  title: string;
  description: string;
  image: string;
  url: string;
  type?: string;
  siteName?: string;
  locale?: string;
}

export interface TwitterTags {
  card: string;
  site: string;
  creator: string;
  title: string;
  description: string;
  image: string;
}

export interface ManifestConfig {
  name: string;
  shortName: string;
  description: string;
  startUrl: string;
  display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
  backgroundColor: string;
  themeColor: string;
  icons: ManifestIcon[];
  orientation?: 'portrait' | 'landscape' | 'any';
  categories?: string[];
}

export interface ManifestIcon {
  src: string;
  sizes: string;
  type: string;
  purpose?: 'any' | 'maskable' | 'monochrome';
}

export interface ServiceWorkerConfig {
  scope: string;
  swSrc: string;
  swDest: string;
  globPatterns: string[];
  globIgnores: string[];
  maximumFileSizeToCacheInBytes: number;
  runtimeCaching: RuntimeCaching[];
}

export interface RuntimeCaching {
  urlPattern: RegExp | string;
  handler: 'CacheFirst' | 'CacheOnly' | 'NetworkFirst' | 'NetworkOnly' | 'StaleWhileRevalidate';
  options?: {
    cacheName?: string;
    expiration?: {
      maxEntries?: number;
      maxAgeSeconds?: number;
    };
    networkTimeoutSeconds?: number;
  };
}

export interface PWAConfig {
  enabled: boolean;
  manifest: ManifestConfig;
  serviceWorker: ServiceWorkerConfig;
  offlinePage?: string;
  splashScreen?: string;
}

export interface PerformanceConfig {
  imageOptimization: boolean;
  codeSplitting: boolean;
  lazyLoading: boolean;
  prefetching: boolean;
  caching: boolean;
  compression: boolean;
  minification: boolean;
  treeShaking: boolean;
}

export interface SecurityConfig {
  csrf: boolean;
  xss: boolean;
  sqlInjection: boolean;
  rateLimiting: boolean;
  cors: boolean;
  helmet: boolean;
  encryption: boolean;
  authentication: boolean;
  authorization: boolean;
  validation: boolean;
  sanitization: boolean;
}

export interface AccessibilityConfig {
  ariaLabels: boolean;
  keyboardNavigation: boolean;
  screenReader: boolean;
  colorContrast: boolean;
  fontSize: boolean;
  focusIndicator: boolean;
  skipLinks: boolean;
  landmarks: boolean;
}

export interface InternationalizationConfig {
  defaultLocale: string;
  locales: string[];
  fallbackLocale: string;
  messages: Record<string, Record<string, string>>;
  formats?: Record<string, unknown>;
}

export interface LocalizationConfig {
  locale: string;
  timezone: string;
  currency: string;
  numberFormat: Intl.NumberFormatOptions;
  dateFormat: Intl.DateTimeFormatOptions;
  measurementSystem: 'metric' | 'imperial';
}

export interface ThemeVariables {
  '--color-primary': string;
  '--color-secondary': string;
  '--color-accent': string;
  '--color-background': string;
  '--color-surface': string;
  '--color-text': string;
  '--color-text-secondary': string;
  '--color-border': string;
  '--color-error': string;
  '--color-success': string;
  '--color-warning': string;
  '--font-heading': string;
  '--font-body': string;
  '--font-mono': string;
  '--spacing-xs': string;
  '--spacing-sm': string;
  '--spacing-md': string;
  '--spacing-lg': string;
  '--spacing-xl': string;
  '--radius-sm': string;
  '--radius-md': string;
  '--radius-lg': string;
  '--radius-xl': string;
  '--shadow-sm': string;
  '--shadow-md': string;
  '--shadow-lg': string;
  '--shadow-xl': string;
  '--transition-fast': string;
  '--transition-normal': string;
  '--transition-slow': string;
  '--z-index-dropdown': string;
  '--z-index-modal': string;
  '--z-index-tooltip': string;
  '--z-index-toast': string;
}

export interface CSSClasses {
  [key: string]: string;
}

export interface StyleConfig {
  theme: ThemeVariables;
  classes: CSSClasses;
  mediaQueries: Record<string, string>;
  animations: Record<string, string>;
}

export interface ResponsiveConfig {
  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
  };
  columns: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
  };
  gutter: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
  };
}

export interface GridConfig {
  columns: number;
  rows?: number;
  gap?: number;
  columnGap?: number;
  rowGap?: number;
  minChildWidth?: string;
  maxChildWidth?: string;
  autoFit?: boolean;
  autoFill?: boolean;
}

export interface FlexConfig {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  gap?: number;
  columnGap?: number;
  rowGap?: number;
}

export interface SpacingConfig {
  padding?: SpacingValue;
  margin?: SpacingValue;
}

export interface SpacingValue {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  x?: number;
  y?: number;
}

export interface TypographyConfig {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: number;
  lineHeight?: number;
  letterSpacing?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  textDecoration?: 'none' | 'underline' | 'line-through';
  color?: string;
}

export interface ColorConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  info: string;
  disabled: string;
  placeholder: string;
}

export interface ShadowConfig {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  none: string;
}

export interface BorderConfig {
  width: string;
  style: 'solid' | 'dashed' | 'dotted' | 'none';
  color: string;
  radius: string;
}

export interface TransitionConfig {
  property: string;
  duration: string;
  timingFunction: string;
  delay: string;
}

export interface TransformConfig {
  scale?: number;
  rotate?: number;
  translateX?: number;
  translateY?: number;
  skewX?: number;
  skewY?: number;
  origin?: string;
}

export interface FilterConfig {
  blur?: number;
  brightness?: number;
  contrast?: number;
  grayscale?: number;
  hueRotate?: number;
  invert?: number;
  opacity?: number;
  saturate?: number;
  sepia?: number;
}

export interface GradientConfig {
  type: 'linear' | 'radial' | 'conic';
  direction?: string;
  colors: string[];
  stops?: number[];
}

export interface BackgroundConfig {
  color?: string;
  image?: string;
  gradient?: GradientConfig;
  size?: 'cover' | 'contain' | 'auto';
  position?: string;
  repeat?: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y';
  attachment?: 'scroll' | 'fixed' | 'local';
  blendMode?: string;
}

export interface ZIndexConfig {
  dropdown: number;
  sticky: number;
  fixed: number;
  modalBackdrop: number;
  modal: number;
  popover: number;
  tooltip: number;
  toast: number;
  loading: number;
}

export interface OverflowConfig {
  x?: 'visible' | 'hidden' | 'scroll' | 'auto';
  y?: 'visible' | 'hidden' | 'scroll' | 'auto';
}

export interface PositionConfig {
  position: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  zIndex?: number;
}

export interface DisplayConfig {
  display: 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none';
  visibility?: 'visible' | 'hidden' | 'collapse';
  opacity?: number;
}

export interface SizingConfig {
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
}

export interface CursorConfig {
  cursor: 'auto' | 'default' | 'pointer' | 'wait' | 'text' | 'move' | 'not-allowed' | 'grab' | 'grabbing' | 'zoom-in' | 'zoom-out';
  userSelect?: 'none' | 'text' | 'all' | 'auto';
  pointerEvents?: 'none' | 'auto';
}

export interface ListConfig {
  listStyle: 'none' | 'disc' | 'circle' | 'square' | 'decimal' | 'lower-roman' | 'upper-roman' | 'lower-alpha' | 'upper-alpha';
  listStylePosition?: 'inside' | 'outside';
}

export interface TableConfig {
  borderCollapse: 'collapse' | 'separate';
  borderSpacing?: string;
  captionSide?: 'top' | 'bottom';
  emptyCells?: 'show' | 'hide';
  tableLayout?: 'auto' | 'fixed';
}

export interface CounterConfig {
  counterReset?: string;
  counterIncrement?: string;
  content?: string;
}

export interface QuotesConfig {
  quotes?: string;
  content?: string;
}

export interface PageBreakConfig {
  breakBefore?: 'auto' | 'always' | 'avoid' | 'left' | 'right' | 'page';
  breakAfter?: 'auto' | 'always' | 'avoid' | 'left' | 'right' | 'page';
  breakInside?: 'auto' | 'avoid';
}

export interface PrintConfig {
  size?: string;
  margin?: string;
  pageBreakBefore?: string;
  pageBreakAfter?: string;
  pageBreakInside?: string;
  orphans?: number;
  widows?: number;
}

export interface SpeechConfig {
  speak?: 'normal' | 'none' | 'spell-out';
  speakAs?: 'normal' | 'spell-out' | 'digits' | 'literal-punctuation' | 'no-punctuation';
  voiceFamily?: string;
  voiceRate?: number;
  voicePitch?: number;
  voiceVolume?: number;
}

export interface ScrollConfig {
  scrollBehavior?: 'auto' | 'smooth';
  scrollSnapType?: 'none' | 'x' | 'y' | 'both' | 'mandatory' | 'proximity';
  scrollSnapAlign?: 'none' | 'start' | 'end' | 'center';
  scrollPadding?: string;
  scrollMargin?: string;
  overscrollBehavior?: 'auto' | 'contain' | 'none';
}

export interface WillChangeConfig {
  willChange: 'auto' | 'scroll-position' | 'contents' | 'transform' | 'opacity' | string;
}

export interface ContainConfig {
  contain: 'none' | 'strict' | 'content' | 'size' | 'layout' | 'style' | 'paint';
}

export interface IsolationConfig {
  isolation: 'auto' | 'isolate';
}

export interface ObjectFitConfig {
  objectFit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  objectPosition?: string;
}

export interface ImageConfig {
  imageRendering: 'auto' | 'crisp-edges' | 'pixelated';
  imageOrientation?: 'from-image' | 'none';
}

export interface MaskConfig {
  maskImage?: string;
  maskMode?: 'alpha' | 'luminance' | 'match-source';
  maskRepeat?: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y' | 'space' | 'round';
  maskPosition?: string;
  maskSize?: 'cover' | 'contain' | string;
  maskClip?: 'border-box' | 'padding-box' | 'content-box' | 'fill-box' | 'stroke-box' | 'no-clip';
  maskOrigin?: 'border-box' | 'padding-box' | 'content-box' | 'fill-box' | 'stroke-box';
  maskComposite?: 'add' | 'subtract' | 'intersect' | 'exclude';
}

export interface ClipConfig {
  clipPath?: string;
  clipRule?: 'nonzero' | 'evenodd';
}

export interface BlendConfig {
  mixBlendMode: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity';
  backgroundBlendMode?: string;
}

export interface OutlineConfig {
  outlineWidth?: string;
  outlineStyle?: 'none' | 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
  outlineColor?: string;
  outlineOffset?: string;
}

export interface ResizeConfig {
  resize: 'none' | 'both' | 'horizontal' | 'vertical';
}

export interface AppearanceConfig {
  appearance: 'none' | 'auto' | 'menulist-button' | 'textfield' | 'button' | 'checkbox' | 'listbox' | 'menulist' | 'meter' | 'progress-bar' | 'push-button' | 'radio' | 'searchfield' | 'slider-horizontal' | 'square-button' | 'textarea';
}

export interface AccentColorConfig {
  accentColor: string;
  colorScheme?: 'normal' | 'light' | 'dark' | 'only light' | 'only dark';
}

export interface CaretConfig {
  caretColor: string;
  caretShape?: 'auto' | 'bar' | 'block' | 'underscore';
}

export interface FieldSizingConfig {
  fieldSizing: 'content' | 'fixed';
}

export interface InputConfig {
  inputSecurity?: 'auto' | 'none';
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
}

export interface WritingConfig {
  writingMode: 'horizontal-tb' | 'vertical-rl' | 'vertical-lr';
  direction?: 'ltr' | 'rtl';
  textOrientation?: 'mixed' | 'upright' | 'sideways';
  textCombineUpright?: 'none' | 'all';
  unicodeBidi?: 'normal' | 'embed' | 'isolate' | 'bidi-override' | 'isolate-override' | 'plaintext';
}

export interface RubyConfig {
  rubyPosition?: 'over' | 'under' | 'inter-character';
  rubyAlign?: 'start' | 'center' | 'space-between' | 'space-around';
}

export interface MathConfig {
  mathStyle: 'normal' | 'compact';
  mathDepth?: number;
  mathShift?: 'normal' | 'compact';
}

export interface FontConfig {
  fontDisplay?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  fontKerning?: 'auto' | 'normal' | 'none';
  fontLanguageOverride?: string;
  fontOpticalSizing?: 'auto' | 'none';
  fontPalette?: string;
  fontStretch?: string;
  fontStyle?: 'normal' | 'italic' | 'oblique';
  fontSynthesis?: 'none' | 'weight' | 'style' | 'small-caps';
  fontVariant?: string;
  fontVariantAlternates?: string;
  fontVariantCaps?: 'normal' | 'small-caps' | 'all-small-caps' | 'petite-caps' | 'all-petite-caps' | 'unicase' | 'titling-caps';
  fontVariantEastAsian?: string;
  fontVariantLigatures?: string;
  fontVariantNumeric?: string;
  fontVariantPosition?: 'normal' | 'sub' | 'super';
  fontVariationSettings?: string;
  fontWeight?: number | string;
}

export interface TextConfig {
  textAlignLast?: 'auto' | 'start' | 'end' | 'left' | 'right' | 'center' | 'justify';
  textCombineUpright?: 'none' | 'all';
  textDecorationColor?: string;
  textDecorationLine?: 'none' | 'underline' | 'overline' | 'line-through' | 'blink';
  textDecorationSkip?: 'none' | 'objects' | 'spaces' | 'leading-spaces' | 'trailing-spaces' | 'edges' | 'box-decoration';
  textDecorationSkipInk?: 'auto' | 'none';
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';
  textDecorationThickness?: string;
  textEmphasis?: string;
  textEmphasisColor?: string;
  textEmphasisPosition?: string;
  textEmphasisStyle?: string;
  textIndent?: string;
  textJustify?: 'auto' | 'inter-word' | 'inter-character' | 'none';
  textOrientation?: 'mixed' | 'upright' | 'sideways';
  textOverflow?: 'clip' | 'ellipsis' | string;
  textRendering?: 'auto' | 'optimizeSpeed' | 'optimizeLegibility' | 'geometricPrecision';
  textShadow?: string;
  textSizeAdjust?: 'none' | 'auto' | string;
  textUnderlineOffset?: string;
  textUnderlinePosition?: 'auto' | 'under' | 'left' | 'right' | string;
  textWrap?: 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable';
  hangingPunctuation?: 'none' | 'first' | 'last' | 'allow-end' | 'force-end';
  hyphens?: 'none' | 'manual' | 'auto';
  letterSpacing?: string;
  lineBreak?: 'auto' | 'loose' | 'normal' | 'strict' | 'anywhere';
  lineHeight?: number | string;
  overflowWrap?: 'normal' | 'break-word' | 'anywhere';
  tabSize?: number;
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line' | 'break-spaces';
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word';
  wordSpacing?: string;
  wordWrap?: 'normal' | 'break-word';
}

export interface ColumnConfig {
  columns?: string;
  columnCount?: number;
  columnFill?: 'auto' | 'balance' | 'balance-all';
  columnGap?: string;
  columnRule?: string;
  columnRuleColor?: string;
  columnRuleStyle?: string;
  columnRuleWidth?: string;
  columnSpan?: 'none' | 'all';
  columnWidth?: string;
}

export interface FlexboxConfig {
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'start' | 'end' | 'baseline';
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'first baseline' | 'last baseline' | 'start' | 'end' | 'self-start' | 'self-end';
  alignSelf?: 'auto' | 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'first baseline' | 'last baseline' | 'start' | 'end' | 'self-start' | 'self-end';
  flex?: string;
  flexBasis?: string;
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexFlow?: string;
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: string;
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'start' | 'end' | 'left' | 'right';
  justifyItems?: 'stretch' | 'start' | 'end' | 'center' | 'left' | 'right' | 'self-start' | 'self-end' | 'flex-start' | 'flex-end' | 'baseline' | 'first baseline' | 'last baseline' | 'safe center' | 'unsafe center' | 'legacy' | 'legacy left' | 'legacy right' | 'legacy center';
  justifySelf?: 'auto' | 'stretch' | 'start' | 'end' | 'center' | 'left' | 'right' | 'self-start' | 'self-end' | 'flex-start' | 'flex-end' | 'baseline' | 'first baseline' | 'last baseline' | 'safe center' | 'unsafe center';
  order?: number;
  placeContent?: string;
  placeItems?: string;
  placeSelf?: string;
  rowGap?: string;
  columnGap?: string;
}

export interface GridLayoutConfig {
  grid?: string;
  gridArea?: string;
  gridAutoColumns?: string;
  gridAutoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense';
  gridAutoRows?: string;
  gridColumn?: string;
  gridColumnEnd?: string;
  gridColumnStart?: string;
  gridRow?: string;
  gridRowEnd?: string;
  gridRowStart?: string;
  gridTemplate?: string;
  gridTemplateAreas?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
}

export interface BoxConfig {
  boxAlign?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  boxDecorationBreak?: 'slice' | 'clone';
  boxDirection?: 'normal' | 'reverse' | 'inherit';
  boxFlex?: number;
  boxFlexGroup?: number;
  boxLines?: 'single' | 'multiple';
  boxOrdinalGroup?: number;
  boxOrient?: 'horizontal' | 'vertical' | 'inline-axis' | 'block-axis';
  boxPack?: 'start' | 'end' | 'center' | 'justify';
  boxShadow?: string;
  boxSizing?: 'content-box' | 'border-box';
}

export interface AnimationCSSConfig {
  animation?: string;
  animationDelay?: string;
  animationDirection?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  animationDuration?: string;
  animationFillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  animationIterationCount?: number | 'infinite';
  animationName?: string;
  animationPlayState?: 'running' | 'paused';
  animationTimingFunction?: string;
  animationComposition?: 'replace' | 'add' | 'accumulate';
  animationRange?: string;
  animationRangeEnd?: string;
  animationRangeStart?: string;
  animationTimeline?: string;
}

export interface TransformCSSConfig {
  transform?: string;
  transformBox?: 'content-box' | 'border-box' | 'fill-box' | 'stroke-box' | 'view-box';
  transformOrigin?: string;
  transformStyle?: 'flat' | 'preserve-3d';
  translate?: string;
  rotate?: string;
  scale?: string;
  perspective?: string;
  perspectiveOrigin?: string;
  backfaceVisibility?: 'visible' | 'hidden';
}

export interface TransitionCSSConfig {
  transition?: string;
  transitionDelay?: string;
  transitionDuration?: string;
  transitionProperty?: string;
  transitionTimingFunction?: string;
  transitionBehavior?: 'normal' | 'allow-discrete';
}

export interface MotionConfig {
  motionPath?: string;
  motionOffset?: string;
  motionRotation?: string;
  offset?: string;
  offsetAnchor?: string;
  offsetDistance?: string;
  offsetPath?: string;
  offsetPosition?: string;
  offsetRotate?: string;
}

export interface ScrollAnimConfig {
  scrollTimeline?: string;
  scrollTimelineAxis?: 'block' | 'inline' | 'x' | 'y';
  scrollTimelineName?: string;
  viewTimeline?: string;
  viewTimelineAxis?: 'block' | 'inline' | 'x' | 'y';
  viewTimelineInset?: string;
  viewTimelineName?: string;
  animationTimeline?: string;
  animationRange?: string;
  animationRangeStart?: string;
  animationRangeEnd?: string;
}

export interface ContainerConfig {
  container?: string;
  containerName?: string;
  containerType?: 'normal' | 'size' | 'inline-size';
}

export interface LayerConfig {
  layer?: string;
  '@layer'?: string;
}

export interface ScopeConfig {
  '@scope'?: string;

}

export interface NestingConfig {
  '&'?: Record<string, string>;
  '@media'?: Record<string, Record<string, string>>;
  '@supports'?: Record<string, Record<string, string>>;
  '@container'?: Record<string, Record<string, string>>;
  '@layer'?: Record<string, Record<string, string>>;
  '@scope'?: Record<string, Record<string, string>>;
}

export interface CustomPropertyConfig {
  [key: `--${string}`]: string;
}

export interface AtRuleConfig {
  '@charset'?: string;
  '@import'?: string;
  '@namespace'?: string;
  '@media'?: Record<string, Record<string, string>>;
  '@supports'?: Record<string, Record<string, string>>;
  '@document'?: Record<string, Record<string, string>>;
  '@page'?: Record<string, string>;
  '@font-face'?: Record<string, string>;
  '@keyframes'?: Record<string, Record<string, string>>;
  '@counter-style'?: Record<string, string>;
  '@font-feature-values'?: Record<string, Record<string, string>>;
  '@property'?: Record<string, string>;
  '@scroll-timeline'?: Record<string, string>;
  '@view-transition'?: Record<string, string>;
}

export interface PseudoClassConfig {
  ':active'?: Record<string, string>;
  ':focus'?: Record<string, string>;
  ':focus-visible'?: Record<string, string>;
  ':focus-within'?: Record<string, string>;
  ':visited'?: Record<string, string>;
  ':link'?: Record<string, string>;
  ':target'?: Record<string, string>;
  ':enabled'?: Record<string, string>;
  ':disabled'?: Record<string, string>;
  ':checked'?: Record<string, string>;
  ':indeterminate'?: Record<string, string>;
  ':default'?: Record<string, string>;
  ':valid'?: Record<string, string>;
  ':invalid'?: Record<string, string>;
  ':in-range'?: Record<string, string>;
  ':out-of-range'?: Record<string, string>;
  ':required'?: Record<string, string>;
  ':optional'?: Record<string, string>;
  ':read-only'?: Record<string, string>;
  ':read-write'?: Record<string, string>;
  ':placeholder-shown'?: Record<string, string>;
  ':empty'?: Record<string, string>;
  ':first-child'?: Record<string, string>;
  ':last-child'?: Record<string, string>;
  ':only-child'?: Record<string, string>;
  ':first-of-type'?: Record<string, string>;
  ':last-of-type'?: Record<string, string>;
  ':only-of-type'?: Record<string, string>;
  ':nth-child'?: Record<string, string>;
  ':nth-last-child'?: Record<string, string>;
  ':nth-of-type'?: Record<string, string>;
  ':nth-last-of-type'?: Record<string, string>;
  ':root'?: Record<string, string>;
  ':not'?: Record<string, string>;
  ':is'?: Record<string, string>;
  ':where'?: Record<string, string>;
  ':has'?: Record<string, string>;
  ':dir'?: Record<string, string>;
  ':lang'?: Record<string, string>;
  ':any-link'?: Record<string, string>;
  ':autofill'?: Record<string, string>;
  ':blank'?: Record<string, string>;
  ':buffering'?: Record<string, string>;
  ':current'?: Record<string, string>;
  ':defined'?: Record<string, string>;
  ':fullscreen'?: Record<string, string>;
  ':future'?: Record<string, string>;
  ':hover'?: Record<string, string>;
  ':in-view'?: Record<string, string>;
  ':local-link'?: Record<string, string>;
  ':modal'?: Record<string, string>;
  ':muted'?: Record<string, string>;
  ':past'?: Record<string, string>;
  ':paused'?: Record<string, string>;
  ':picture-in-picture'?: Record<string, string>;
  ':playing'?: Record<string, string>;
  ':popover-open'?: Record<string, string>;
  ':seeking'?: Record<string, string>;
  ':stalled'?: Record<string, string>;
  ':state'?: Record<string, string>;
  ':user-invalid'?: Record<string, string>;
  ':user-valid'?: Record<string, string>;
  ':volume-locked'?: Record<string, string>;
  ':window-inactive'?: Record<string, string>;
}

export interface PseudoElementConfig {
  '::before'?: Record<string, string>;
  '::after'?: Record<string, string>;
  '::first-letter'?: Record<string, string>;
  '::first-line'?: Record<string, string>;
  '::selection'?: Record<string, string>;
  '::backdrop'?: Record<string, string>;
  '::placeholder'?: Record<string, string>;
  '::marker'?: Record<string, string>;
  '::spelling-error'?: Record<string, string>;
  '::grammar-error'?: Record<string, string>;
  '::cue'?: Record<string, string>;
  '::cue-region'?: Record<string, string>;
  '::part'?: Record<string, string>;
  '::slotted'?: Record<string, string>;
  '::view-transition'?: Record<string, string>;
  '::view-transition-group'?: Record<string, string>;
  '::view-transition-image-pair'?: Record<string, string>;
  '::view-transition-new'?: Record<string, string>;
  '::view-transition-old'?: Record<string, string>;
  '::file-selector-button'?: Record<string, string>;
  '::target-text'?: Record<string, string>;
}

export interface CSSStyleConfig {
  all?: 'initial' | 'inherit' | 'unset' | 'revert' | 'revert-layer';
  unicodeBidi?: string;
  clip?: string;
  zoom?: number;
  aspectRatio?: string;
  float?: 'left' | 'right' | 'none' | 'inline-start' | 'inline-end';
  clear?: 'none' | 'left' | 'right' | 'both' | 'inline-start' | 'inline-end';
  content?: string;
  counterIncrement?: string;
  counterReset?: string;
  counterSet?: string;
  quotes?: string;
  page?: string;
  pageBreakAfter?: string;
  pageBreakBefore?: string;
  pageBreakInside?: string;
  size?: string;
  marks?: string;
  bleed?: string;
  imageResolution?: string;
  imageOrientation?: string;
  imageRendering?: string;
  objectFit?: string;
  objectPosition?: string;
  shapeImageThreshold?: number;
  shapeMargin?: string;
  shapeOutside?: string;
  touchAction?: string;
  scrollBehavior?: string;
  scrollSnapAlign?: string;
  scrollSnapStop?: string;
  scrollSnapType?: string;
  overscrollBehavior?: string;
  overscrollBehaviorBlock?: string;
  overscrollBehaviorInline?: string;
  overscrollBehaviorX?: string;
  overscrollBehaviorY?: string;
  scrollbarWidth?: string;
  scrollbarColor?: string;
  scrollbarGutter?: string;
  scrollPadding?: string;
  scrollPaddingBlock?: string;
  scrollPaddingBlockEnd?: string;
  scrollPaddingBlockStart?: string;
  scrollPaddingInline?: string;
  scrollPaddingInlineEnd?: string;
  scrollPaddingInlineStart?: string;
  scrollMargin?: string;
  scrollMarginBlock?: string;
  scrollMarginBlockEnd?: string;
  scrollMarginBlockStart?: string;
  scrollMarginInline?: string;
  scrollMarginInlineEnd?: string;
  scrollMarginInlineStart?: string;
  scrollTimeline?: string;
  scrollTimelineAxis?: string;
  scrollTimelineName?: string;
  viewTimeline?: string;
  viewTimelineAxis?: string;
  viewTimelineInset?: string;
  viewTimelineName?: string;
  animationTimeline?: string;
  animationRange?: string;
  animationRangeEnd?: string;
  animationRangeStart?: string;
  timelineScope?: string;
  container?: string;
  containerName?: string;
  containerType?: string;
  contain?: string;
  containIntrinsicSize?: string;
  contentVisibility?: string;
  breakAfter?: string;
  breakBefore?: string;
  breakInside?: string;
  columns?: string;
  columnCount?: number;
  columnFill?: string;
  columnGap?: string;
  columnRule?: string;
  columnRuleColor?: string;
  columnRuleStyle?: string;
  columnRuleWidth?: string;
  columnSpan?: string;
  columnWidth?: string;
  widows?: number;
  orphans?: number;
  isolation?: string;
  willChange?: string;
  forcedColorAdjust?: string;
  printColorAdjust?: string;
  colorScheme?: string;
  accentColor?: string;
  caretColor?: string;
  caretShape?: string;
  fieldSizing?: string;
  inputSecurity?: string;
  userSelect?: string;
  msUserSelect?: string;
  webkitTouchCallout?: string;
  webkitLineClamp?: number;
  webkitBoxOrient?: string;
  webkitBoxDirection?: string;
  webkitBoxOrdinalGroup?: number;
  webkitBoxAlign?: string;
  webkitBoxPack?: string;
  webkitBoxFlex?: number;
  webkitBoxFlexGroup?: number;
  webkitBoxLines?: string;
  webkitColumnCount?: number;
  webkitColumnGap?: string;
  webkitColumnRule?: string;
  webkitColumnRuleColor?: string;
  webkitColumnRuleStyle?: string;
  webkitColumnRuleWidth?: string;
  webkitColumnSpan?: string;
  webkitColumnWidth?: string;
  webkitMask?: string;
  webkitMaskBoxImage?: string;
  webkitMaskBoxImageOutset?: string;
  webkitMaskBoxImageRepeat?: string;
  webkitMaskBoxImageSlice?: string;
  webkitMaskBoxImageSource?: string;
  webkitMaskBoxImageWidth?: string;
  webkitMaskClip?: string;
  webkitMaskComposite?: string;
  webkitMaskImage?: string;
  webkitMaskOrigin?: string;
  webkitMaskPosition?: string;
  webkitMaskPositionX?: string;
  webkitMaskPositionY?: string;
  webkitMaskRepeat?: string;
  webkitMaskSize?: string;
  webkitOverflowScrolling?: string;
  webkitScrollSnapType?: string;
  webkitScrollSnapPointsX?: string;
  webkitScrollSnapPointsY?: string;
  webkitScrollSnapDestination?: string;
  webkitScrollSnapCoordinate?: string;
  webkitTextFillColor?: string;
  webkitTextStroke?: string;
  webkitTextStrokeColor?: string;
  webkitTextStrokeWidth?: string;
  webkitTextEmphasis?: string;
  webkitTextDecoration?: string;
  webkitWritingMode?: string;
  webkitAppearance?: string;
  webkitFontSmoothing?: string;
  webkitBackfaceVisibility?: string;
  webkitPerspective?: string;
  webkitPerspectiveOrigin?: string;
  webkitTransform?: string;
  webkitTransformOrigin?: string;
  webkitTransformStyle?: string;
  webkitTransition?: string;
  webkitTransitionDelay?: string;
  webkitTransitionDuration?: string;
  webkitTransitionProperty?: string;
  webkitTransitionTimingFunction?: string;
  webkitAnimation?: string;
  webkitAnimationDelay?: string;
  webkitAnimationDirection?: string;
  webkitAnimationDuration?: string;
  webkitAnimationFillMode?: string;
  webkitAnimationIterationCount?: number;
  webkitAnimationName?: string;
  webkitAnimationPlayState?: string;
  webkitAnimationTimingFunction?: string;
  webkitFilter?: string;
  webkitBackdropFilter?: string;
  webkitBoxReflect?: string;
  webkitLineBreak?: string;
  webkitHyphens?: string;
  webkitRubyPosition?: string;
  webkitTextCombine?: string;
  webkitTextDecorationLine?: string;
  webkitTextDecorationStyle?: string;
  webkitTextDecorationColor?: string;
  webkitTextDecorationSkip?: string;
  webkitTextUnderlinePosition?: string;
  webkitTextEmphasisStyle?: string;
  webkitTextEmphasisColor?: string;
  webkitTextEmphasisPosition?: string;
  webkitTextOrientation?: string;
  webkitTextCombineUpright?: string;
  webkitTextSecurity?: string;
  webkitTextSizeAdjust?: string;
  webkitUserModify?: string;
  webkitUserDrag?: string;
  webkitUserSelect?: string;
  webkitMarginBefore?: string;
  webkitMarginAfter?: string;
  webkitMarginStart?: string;
  webkitMarginEnd?: string;
  webkitPaddingBefore?: string;
  webkitPaddingAfter?: string;
  webkitPaddingStart?: string;
  webkitPaddingEnd?: string;
  webkitBorderBefore?: string;
  webkitBorderBeforeColor?: string;
  webkitBorderBeforeStyle?: string;
  webkitBorderBeforeWidth?: string;
  webkitBorderAfter?: string;
  webkitBorderAfterColor?: string;
  webkitBorderAfterStyle?: string;
  webkitBorderAfterWidth?: string;
  webkitBorderStart?: string;
  webkitBorderStartColor?: string;
  webkitBorderStartStyle?: string;
  webkitBorderStartWidth?: string;
  webkitBorderEnd?: string;
  webkitBorderEndColor?: string;
  webkitBorderEndStyle?: string;
  webkitBorderEndWidth?: string;
  webkitLogicalWidth?: string;
  webkitLogicalHeight?: string;
  webkitMinLogicalWidth?: string;
  webkitMinLogicalHeight?: string;
  webkitMaxLogicalWidth?: string;
  webkitMaxLogicalHeight?: string;
  mozAppearance?: string;
  mozBackfaceVisibility?: string;
  mozBinding?: string;
  mozBorderBottomColors?: string;
  mozBorderLeftColors?: string;
  mozBorderRightColors?: string;
  mozBorderTopColors?: string;
  mozBoxAlign?: string;
  mozBoxDirection?: string;
  mozBoxFlex?: number;
  mozBoxOrdinalGroup?: number;
  mozBoxOrient?: string;
  mozBoxPack?: string;
  mozBoxShadow?: string;
  mozBoxSizing?: string;
  mozColumnCount?: number;
  mozColumnFill?: string;
  mozColumnGap?: string;
  mozColumnRule?: string;
  mozColumnRuleColor?: string;
  mozColumnRuleStyle?: string;
  mozColumnRuleWidth?: string;
  mozColumnWidth?: string;
  mozFloatEdge?: string;
  mozFontSmoothing?: string;
  mozForceBrokenImageIcon?: number;
  mozImageRegion?: string;
  mozMarginEnd?: string;
  mozMarginStart?: string;
  mozOpacity?: number;
  mozOrientation?: string;
  mozOutline?: string;
  mozOutlineColor?: string;
  mozOutlineOffset?: string;
  mozOutlineRadius?: string;
  mozOutlineRadiusBottomleft?: string;
  mozOutlineRadiusBottomright?: string;
  mozOutlineRadiusTopleft?: string;
  mozOutlineRadiusTopright?: string;
  mozOutlineStyle?: string;
  mozOutlineWidth?: string;
  mozPaddingEnd?: string;
  mozPaddingStart?: string;
  mozPerspective?: string;
  mozPerspectiveOrigin?: string;
  mozStackSizing?: string;
  mozTabSize?: number;
  mozTextAlignLast?: string;
  mozTextBlink?: string;
  mozTextDecorationColor?: string;
  mozTextDecorationLine?: string;
  mozTextDecorationStyle?: string;
  mozTextSizeAdjust?: string;
  mozTransformOrigin?: string;
  mozTransformStyle?: string;
  mozTransition?: string;
  mozTransitionDelay?: string;
  mozTransitionDuration?: string;
  mozTransitionProperty?: string;
  mozTransitionTimingFunction?: string;
  mozUserFocus?: string;
  mozUserInput?: string;
  mozUserModify?: string;
  mozUserSelect?: string;
  mozWindowDragging?: string;
  mozWindowShadow?: string;
  msAccelerator?: string;
  msBlockProgression?: string;
  msContentZoomChaining?: string;
  msContentZoomLimit?: string;
  msContentZoomLimitMax?: number;
  msContentZoomLimitMin?: number;
  msContentZoomSnap?: string;
  msContentZoomSnapPoints?: string;
  msContentZoomSnapType?: string;
  msContentZooming?: string;
  msFilter?: string;
  msFlex?: string;
  msFlexAlign?: string;
  msFlexDirection?: string;
  msFlexFlow?: string;
  msFlexItemAlign?: string;
  msFlexLinePack?: string;
  msFlexNegative?: number;
  msFlexOrder?: number;
  msFlexPack?: string;
  msFlexPositive?: number;
  msFlexPreferredSize?: string;
  msFlowFrom?: string;
  msFlowInto?: string;
  msFontFeatureSettings?: string;
  msGridColumn?: string;
  msGridColumnAlign?: string;
  msGridColumnSpan?: string;
  msGridColumns?: string;
  msGridRow?: string;
  msGridRowAlign?: string;
  msGridRowSpan?: string;
  msGridRows?: string;
  msHighContrastAdjust?: string;
  msHyphenateLimitChars?: string;
  msHyphenateLimitLines?: number;
  msHyphenateLimitZone?: string;
  msHyphens?: string;
  msImeAlign?: string;
  msInterpolationMode?: string;
  msLayoutGrid?: string;
  msLayoutGridChar?: string;
  msLayoutGridLine?: string;
  msLayoutGridMode?: string;
  msLayoutGridType?: string;
  msLineBreak?: string;
  msOverflowStyle?: string;
  msPerspective?: string;
  msPerspectiveOrigin?: string;
  msScroll3dPressMode?: string;
  msScrollBoundary?: string;
  msScrollChaining?: string;
  msScrollLimit?: string;
  msScrollLimitXMax?: string;
  msScrollLimitXMin?: string;
  msScrollLimitYMax?: string;
  msScrollLimitYMin?: string;
  msScrollRails?: string;
  msScrollSnapPointsX?: string;
  msScrollSnapPointsY?: string;
  msScrollSnapType?: string;
  msScrollSnapX?: string;
  msScrollSnapY?: string;
  msScrollTranslation?: string;
  msScrollbar3dlightColor?: string;
  msScrollbarArrowColor?: string;
  msScrollbarBaseColor?: string;
  msScrollbarDarkshadowColor?: string;
  msScrollbarFaceColor?: string;
  msScrollbarHighlightColor?: string;
  msScrollbarShadowColor?: string;
  msScrollbarTrackColor?: string;
}