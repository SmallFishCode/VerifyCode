
declare module '*.vue' {
    import type {DefineComponent} from 'Vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}