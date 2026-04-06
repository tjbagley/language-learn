import { Subject } from "rxjs";

export class SaveService {
  public static saveRequired = new Subject<boolean>();
  private static debounceTimeout: NodeJS.Timeout | null = null;
  private static readonly debounceDelay = 300; // milliseconds

  public static notifySaveRequired(): void {
    // Clear existing timeout if any
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    
    // Set new timeout
    this.debounceTimeout = setTimeout(() => {
      this.saveRequired.next(true);
      this.debounceTimeout = null;
    }, this.debounceDelay);
  }
}