export class DashboardWidget {
    public name: string;
    public cols: number;
    public rows: number;
    public description?: string;
    public theme?: string;
    public amount?: string;
    constructor(name: string, description?: string, theme?: string, amount?: string) {
        this.name = name;
        this.description = description;
        this.theme = theme;
        this.amount = amount;
    }
}
