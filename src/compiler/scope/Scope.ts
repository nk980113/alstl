export class Scope {
    private children: Map<string, Scope> = new Map;
    private parent: Scope | null = null;

    public constructor(
        public name: string,
    ) {}

    public createChildren(name: string): Scope {
        const children = new Scope(name);
        children.setParent(this);
        this.children.set(name, children);
        return children;
    }

    public setParent(parent: Scope): this {
        this.parent = parent;
        return this;
    }

    
}
export default Scope;