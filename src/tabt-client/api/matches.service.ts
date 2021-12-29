/**
 * TabT Rest
 * This api is a bridge to the TabT SOAP API. It contacts TabT and cache results in order to reduce latency for some requests. More documentation will come.<br>       The data present in the api such as player names, club names, tournaments or match results are not managed by us. This information is made freely available by the Aile Francophone de Tennis de Table and the Vlaamse Tafeltennisliga. We therefore cannot be held responsible for the publication of this information. If changes need to be made, you should contact the responsible entity.     If you build an application on top of the BePing\'s api, be sure to do at least one of the following things:         <ul><li>If possible, set a X-Application-For header string. Include the name of your application, and a way to contact you in case something would go wrong.<br>       An example user agent string format is, which could result in the following string: beping/2.0.0 (floca.be; florent@floca.be). The use of a header like this isn’t obligated or enforced, but allows for better communication.</li></ul>
 *
 * The version of the OpenAPI document: 1.8.0
 * Contact: f.cardoen@me.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Injectable, Optional } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { MatchSystemEntry } from '../model/matchSystemEntry';
import { TeamMatchesEntry } from '../model/teamMatchesEntry';
import { Configuration } from '../configuration';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MatchesService {
  public defaultHeaders: Record<string, string> = {};
  public configuration = new Configuration();
  protected basePath = 'http://localhost';

  constructor(
    protected httpClient: HttpService,
    @Optional() configuration: Configuration,
  ) {
    this.configuration = configuration || this.configuration;
    this.basePath = configuration?.basePath || this.basePath;
  }

  /**
   *
   *
   * @param xTabtAccount Account to do a request
   * @param xTabtPassword Password of the account
   * @param xTabtOnBehalfOf On Behalf of
   * @param xTabtDatabase Database to query
   * @param xTabtSeason Season name to query
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public findAllMatchSystems(
    xTabtAccount?: string,
    xTabtPassword?: string,
    xTabtOnBehalfOf?: string,
    xTabtDatabase?: 'aftt' | 'vttl',
    xTabtSeason?: string,
  ): Observable<AxiosResponse<Array<MatchSystemEntry>>>;

  public findAllMatchSystems(
    xTabtAccount?: string,
    xTabtPassword?: string,
    xTabtOnBehalfOf?: string,
    xTabtDatabase?: 'aftt' | 'vttl',
    xTabtSeason?: string,
  ): Observable<any> {
    const headers = this.defaultHeaders;
    if (xTabtAccount !== undefined && xTabtAccount !== null) {
      headers['X-Tabt-Account'] = String(xTabtAccount);
    }
    if (xTabtPassword !== undefined && xTabtPassword !== null) {
      headers['X-Tabt-Password'] = String(xTabtPassword);
    }
    if (xTabtOnBehalfOf !== undefined && xTabtOnBehalfOf !== null) {
      headers['X-Tabt-OnBehalfOf'] = String(xTabtOnBehalfOf);
    }
    if (xTabtDatabase !== undefined && xTabtDatabase !== null) {
      headers['X-Tabt-Database'] = String(xTabtDatabase);
    }
    if (xTabtSeason !== undefined && xTabtSeason !== null) {
      headers['X-Tabt-Season'] = String(xTabtSeason);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers['Accept'] = httpHeaderAcceptSelected;
    }

    // to determine the Content-Type header
    const consumes: string[] = [];
    return this.httpClient.get<Array<MatchSystemEntry>>(
      `${this.basePath}/v1/matches/systems`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
      },
    );
  }

  /**
   *
   *
   * @param xTabtAccount Account to do a request
   * @param xTabtPassword Password of the account
   * @param xTabtOnBehalfOf On Behalf of
   * @param xTabtDatabase Database to query
   * @param xTabtSeason Season name to query
   * @param divisionId
   * @param club
   * @param team
   * @param divisionCategory
   * @param weekName
   * @param level
   * @param showDivisionName
   * @param yearDateFrom YYYY-MM-DD
   * @param yearDateTo YYYY-MM-DD
   * @param withDetails
   * @param matchId
   * @param matchUniqueId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public findAllMatches(
    xTabtAccount?: string,
    xTabtPassword?: string,
    xTabtOnBehalfOf?: string,
    xTabtDatabase?: 'aftt' | 'vttl',
    xTabtSeason?: string,
    divisionId?: number,
    club?: string,
    team?: string,
    divisionCategory?:
      | 'MEN'
      | 'WOMEN'
      | 'VETERANS'
      | 'VETERANS_WOMEN'
      | 'YOUTH',
    weekName?: number,
    level?:
      | 'NATIONAL'
      | 'HAINAUT'
      | 'VLAAMS_BRABANT_BR'
      | 'SUPER_DIVISION'
      | 'OOST_VLANDEREN'
      | 'ANTWERP'
      | 'WEST_VLAANDEREN'
      | 'LIMBURG'
      | 'BRUSSELS_BRABANT_WALLON'
      | 'NAMUR'
      | 'LIEGE'
      | 'LUXEMBOURG'
      | 'REGION_VTTL'
      | 'IWB',
    showDivisionName?: string,
    yearDateFrom?: string,
    yearDateTo?: string,
    withDetails?: boolean,
    matchId?: string,
    matchUniqueId?: string,
  ): Observable<AxiosResponse<Array<TeamMatchesEntry>>>;

  public findAllMatches(
    xTabtAccount?: string,
    xTabtPassword?: string,
    xTabtOnBehalfOf?: string,
    xTabtDatabase?: 'aftt' | 'vttl',
    xTabtSeason?: string,
    divisionId?: number,
    club?: string,
    team?: string,
    divisionCategory?:
      | 'MEN'
      | 'WOMEN'
      | 'VETERANS'
      | 'VETERANS_WOMEN'
      | 'YOUTH',
    weekName?: number,
    level?:
      | 'NATIONAL'
      | 'HAINAUT'
      | 'VLAAMS_BRABANT_BR'
      | 'SUPER_DIVISION'
      | 'OOST_VLANDEREN'
      | 'ANTWERP'
      | 'WEST_VLAANDEREN'
      | 'LIMBURG'
      | 'BRUSSELS_BRABANT_WALLON'
      | 'NAMUR'
      | 'LIEGE'
      | 'LUXEMBOURG'
      | 'REGION_VTTL'
      | 'IWB',
    showDivisionName?: string,
    yearDateFrom?: string,
    yearDateTo?: string,
    withDetails?: boolean,
    matchId?: string,
    matchUniqueId?: string,
  ): Observable<any> {
    const queryParameters = {};
    if (divisionId !== undefined && divisionId !== null) {
      queryParameters['divisionId'] = <any>divisionId;
    }
    if (club !== undefined && club !== null) {
      queryParameters['club'] = <any>club;
    }
    if (team !== undefined && team !== null) {
      queryParameters['team'] = <any>team;
    }
    if (divisionCategory !== undefined && divisionCategory !== null) {
      queryParameters['divisionCategory'] = <any>divisionCategory;
    }
    if (weekName !== undefined && weekName !== null) {
      queryParameters['weekName'] = <any>weekName;
    }
    if (level !== undefined && level !== null) {
      queryParameters['level'] = <any>level;
    }
    if (showDivisionName !== undefined && showDivisionName !== null) {
      queryParameters['showDivisionName'] = <any>showDivisionName;
    }
    if (yearDateFrom !== undefined && yearDateFrom !== null) {
      queryParameters['yearDateFrom'] = <any>yearDateFrom;
    }
    if (yearDateTo !== undefined && yearDateTo !== null) {
      queryParameters['yearDateTo'] = <any>yearDateTo;
    }
    if (withDetails !== undefined && withDetails !== null) {
      queryParameters['withDetails'] = <any>withDetails;
    }
    if (matchId !== undefined && matchId !== null) {
      queryParameters['matchId'] = <any>matchId;
    }
    if (matchUniqueId !== undefined && matchUniqueId !== null) {
      queryParameters['matchUniqueId'] = <any>matchUniqueId;
    }

    const headers = this.defaultHeaders;
    if (xTabtAccount !== undefined && xTabtAccount !== null) {
      headers['X-Tabt-Account'] = String(xTabtAccount);
    }
    if (xTabtPassword !== undefined && xTabtPassword !== null) {
      headers['X-Tabt-Password'] = String(xTabtPassword);
    }
    if (xTabtOnBehalfOf !== undefined && xTabtOnBehalfOf !== null) {
      headers['X-Tabt-OnBehalfOf'] = String(xTabtOnBehalfOf);
    }
    if (xTabtDatabase !== undefined && xTabtDatabase !== null) {
      headers['X-Tabt-Database'] = String(xTabtDatabase);
    }
    if (xTabtSeason !== undefined && xTabtSeason !== null) {
      headers['X-Tabt-Season'] = String(xTabtSeason);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers['Accept'] = httpHeaderAcceptSelected;
    }

    // to determine the Content-Type header
    const consumes: string[] = [];
    return this.httpClient.get<Array<TeamMatchesEntry>>(
      `${this.basePath}/v1/matches`,
      {
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
      },
    );
  }

  /**
   *
   *
   * @param matchUniqueId
   * @param xTabtAccount Account to do a request
   * @param xTabtPassword Password of the account
   * @param xTabtOnBehalfOf On Behalf of
   * @param xTabtDatabase Database to query
   * @param xTabtSeason Season name to query
   * @param divisionId
   * @param club
   * @param team
   * @param divisionCategory
   * @param weekName
   * @param level
   * @param showDivisionName
   * @param yearDateFrom YYYY-MM-DD
   * @param yearDateTo YYYY-MM-DD
   * @param withDetails
   * @param matchId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public findMatchById(
    matchUniqueId: number,
    xTabtAccount?: string,
    xTabtPassword?: string,
    xTabtOnBehalfOf?: string,
    xTabtDatabase?: 'aftt' | 'vttl',
    xTabtSeason?: string,
    divisionId?: number,
    club?: string,
    team?: string,
    divisionCategory?:
      | 'MEN'
      | 'WOMEN'
      | 'VETERANS'
      | 'VETERANS_WOMEN'
      | 'YOUTH',
    weekName?: number,
    level?:
      | 'NATIONAL'
      | 'HAINAUT'
      | 'VLAAMS_BRABANT_BR'
      | 'SUPER_DIVISION'
      | 'OOST_VLANDEREN'
      | 'ANTWERP'
      | 'WEST_VLAANDEREN'
      | 'LIMBURG'
      | 'BRUSSELS_BRABANT_WALLON'
      | 'NAMUR'
      | 'LIEGE'
      | 'LUXEMBOURG'
      | 'REGION_VTTL'
      | 'IWB',
    showDivisionName?: string,
    yearDateFrom?: string,
    yearDateTo?: string,
    withDetails?: boolean,
    matchId?: string,
  ): Observable<AxiosResponse<TeamMatchesEntry>>;

  public findMatchById(
    matchUniqueId: number,
    xTabtAccount?: string,
    xTabtPassword?: string,
    xTabtOnBehalfOf?: string,
    xTabtDatabase?: 'aftt' | 'vttl',
    xTabtSeason?: string,
    divisionId?: number,
    club?: string,
    team?: string,
    divisionCategory?:
      | 'MEN'
      | 'WOMEN'
      | 'VETERANS'
      | 'VETERANS_WOMEN'
      | 'YOUTH',
    weekName?: number,
    level?:
      | 'NATIONAL'
      | 'HAINAUT'
      | 'VLAAMS_BRABANT_BR'
      | 'SUPER_DIVISION'
      | 'OOST_VLANDEREN'
      | 'ANTWERP'
      | 'WEST_VLAANDEREN'
      | 'LIMBURG'
      | 'BRUSSELS_BRABANT_WALLON'
      | 'NAMUR'
      | 'LIEGE'
      | 'LUXEMBOURG'
      | 'REGION_VTTL'
      | 'IWB',
    showDivisionName?: string,
    yearDateFrom?: string,
    yearDateTo?: string,
    withDetails?: boolean,
    matchId?: string,
  ): Observable<any> {
    if (matchUniqueId === null || matchUniqueId === undefined) {
      throw new Error(
        'Required parameter matchUniqueId was null or undefined when calling findMatchById.',
      );
    }

    const queryParameters = {};
    if (divisionId !== undefined && divisionId !== null) {
      queryParameters['divisionId'] = <any>divisionId;
    }
    if (club !== undefined && club !== null) {
      queryParameters['club'] = <any>club;
    }
    if (team !== undefined && team !== null) {
      queryParameters['team'] = <any>team;
    }
    if (divisionCategory !== undefined && divisionCategory !== null) {
      queryParameters['divisionCategory'] = <any>divisionCategory;
    }
    if (weekName !== undefined && weekName !== null) {
      queryParameters['weekName'] = <any>weekName;
    }
    if (level !== undefined && level !== null) {
      queryParameters['level'] = <any>level;
    }
    if (showDivisionName !== undefined && showDivisionName !== null) {
      queryParameters['showDivisionName'] = <any>showDivisionName;
    }
    if (yearDateFrom !== undefined && yearDateFrom !== null) {
      queryParameters['yearDateFrom'] = <any>yearDateFrom;
    }
    if (yearDateTo !== undefined && yearDateTo !== null) {
      queryParameters['yearDateTo'] = <any>yearDateTo;
    }
    if (withDetails !== undefined && withDetails !== null) {
      queryParameters['withDetails'] = <any>withDetails;
    }
    if (matchId !== undefined && matchId !== null) {
      queryParameters['matchId'] = <any>matchId;
    }

    const headers = this.defaultHeaders;
    if (xTabtAccount !== undefined && xTabtAccount !== null) {
      headers['X-Tabt-Account'] = String(xTabtAccount);
    }
    if (xTabtPassword !== undefined && xTabtPassword !== null) {
      headers['X-Tabt-Password'] = String(xTabtPassword);
    }
    if (xTabtOnBehalfOf !== undefined && xTabtOnBehalfOf !== null) {
      headers['X-Tabt-OnBehalfOf'] = String(xTabtOnBehalfOf);
    }
    if (xTabtDatabase !== undefined && xTabtDatabase !== null) {
      headers['X-Tabt-Database'] = String(xTabtDatabase);
    }
    if (xTabtSeason !== undefined && xTabtSeason !== null) {
      headers['X-Tabt-Season'] = String(xTabtSeason);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers['Accept'] = httpHeaderAcceptSelected;
    }

    // to determine the Content-Type header
    const consumes: string[] = [];
    return this.httpClient.get<TeamMatchesEntry>(
      `${this.basePath}/v1/matches/${encodeURIComponent(
        String(matchUniqueId),
      )}`,
      {
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
      },
    );
  }

  /**
   *
   *
   * @param matchSystemId
   * @param xTabtAccount Account to do a request
   * @param xTabtPassword Password of the account
   * @param xTabtOnBehalfOf On Behalf of
   * @param xTabtDatabase Database to query
   * @param xTabtSeason Season name to query
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public findMatchSystemById(
    matchSystemId: number,
    xTabtAccount?: string,
    xTabtPassword?: string,
    xTabtOnBehalfOf?: string,
    xTabtDatabase?: 'aftt' | 'vttl',
    xTabtSeason?: string,
  ): Observable<AxiosResponse<MatchSystemEntry>>;

  public findMatchSystemById(
    matchSystemId: number,
    xTabtAccount?: string,
    xTabtPassword?: string,
    xTabtOnBehalfOf?: string,
    xTabtDatabase?: 'aftt' | 'vttl',
    xTabtSeason?: string,
  ): Observable<any> {
    if (matchSystemId === null || matchSystemId === undefined) {
      throw new Error(
        'Required parameter matchSystemId was null or undefined when calling findMatchSystemById.',
      );
    }

    const headers = this.defaultHeaders;
    if (xTabtAccount !== undefined && xTabtAccount !== null) {
      headers['X-Tabt-Account'] = String(xTabtAccount);
    }
    if (xTabtPassword !== undefined && xTabtPassword !== null) {
      headers['X-Tabt-Password'] = String(xTabtPassword);
    }
    if (xTabtOnBehalfOf !== undefined && xTabtOnBehalfOf !== null) {
      headers['X-Tabt-OnBehalfOf'] = String(xTabtOnBehalfOf);
    }
    if (xTabtDatabase !== undefined && xTabtDatabase !== null) {
      headers['X-Tabt-Database'] = String(xTabtDatabase);
    }
    if (xTabtSeason !== undefined && xTabtSeason !== null) {
      headers['X-Tabt-Season'] = String(xTabtSeason);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers['Accept'] = httpHeaderAcceptSelected;
    }

    // to determine the Content-Type header
    const consumes: string[] = [];
    return this.httpClient.get<MatchSystemEntry>(
      `${this.basePath}/v1/matches/systems/${encodeURIComponent(
        String(matchSystemId),
      )}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
      },
    );
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    return consumes.includes(form);
  }
}
