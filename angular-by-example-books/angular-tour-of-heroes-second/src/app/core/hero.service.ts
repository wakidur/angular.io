import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/Operators";

import { Hero, HeroModel } from "../core/model/heroModel";
import { MessageService } from "../core/message.service";
import { CoreModule } from "./core.module";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: CoreModule
})
export class HeroService {
  private heroesUrl = "api/heroes";

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) {}

  /**
   * GET heroes from the server
   * getHeroes
   */
  public getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log("fetched heroes")),
      catchError(this.handleError("getHeroes", []))
    );
  }

  /**
   * GET heroes whose name contains search term
   * @param term -
   *
   */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.httpClient.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>("searchHeroes", []))
    );
  }

  /**
   * addHero
   * POST: Add a new hero to the server
   */
  public addHero(hero: HeroModel): Observable<HeroModel> {
    return this.httpClient
      .post<HeroModel>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap((hero: HeroModel) => {
          this.log(`added hero w/ id=${hero.id}`);
        }),
        catchError(this.handleError<HeroModel>("addHero"))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
