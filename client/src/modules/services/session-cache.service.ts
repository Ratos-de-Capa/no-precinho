import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class SessionCacheService {
    private cache: Map<string, any> = new Map<string, any>();

    public get(key: string): any {
        return this.cache.get(key);
    }

    public has(key: string): boolean {
        return this.cache.has(key);
    }

    public set(key: string, value: any): void {
        this.cache.set(key, value);
    }

    public remove(key: string): void {
        this.cache.delete(key);
    }

    public clear(): void {
        this.cache.clear();
    }
}
