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
import { DivisionEntry } from '../model/divisionEntry';
import { MemberResults } from '../model/memberResults';
import { RankingEntry } from '../model/rankingEntry';
import { TeamMatchesEntry } from '../model/teamMatchesEntry';
import { Configuration } from '../configuration';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class DivisionsService {
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
   * @param level
   * @param showDivisionName
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public findAllDivisions(
    xTabtAccount?: string,
    xTabtPassword?: string,
    xTabtOnBehalfOf?: string,
    xTabtDatabase?: 'aftt' | 'vttl',
    xTabtSeason?: string,
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
    showDivisionName?: 'no' | 'yes' | 'short',
  ): Observable<AxiosResponse<Array<DivisionEntry>>>;

  public findAllDivisions(
    xTabtAccount?: string,
    xTabtPassword?: string,
    xTabtOnBehalfOf?: string,
    xTabtDatabase?: 'aftt' | 'vttl',
    xTabtSeason?: string,
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
    showDivisionName?: 'no' | 'yes' | 'short',
  ): Observable<any> {
    const queryParameters = {};
    if (level !== undefined && level !== null) {
      queryParameters['level'] = <any>level;
    }
    if (showDivisionName !== undefined && showDivisionName !== null) {
      queryParameters['showDivisionName'] = <any>showDivisionName;
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
    return this.httpClient.get<Array<DivisionEntry>>(
      `${this.basePath}/v1/divisions`,
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
   * @param divisionId
   * @param xTabtAccount Account to do a request
   * @param xTabtPassword Password of the account
   * @param xTabtOnBehalfOf On Behalf of
   * @param xTabtDatabase Database to query
   * @param xTabtSeason Season name to query
   * @param level
   * @param showDivisionName
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public findDivisionById(
    divisionId: number,
    xTabtAccount?: string,
    xTabtPassword?: string,
    xTabtOnBehalfOf?: string,
    xTabtDatabase?: 'aftt' | 'vttl',
    xTabtSeason?: string,
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
    showDivisionName?: 'no' | 'yes' | 'short',
  ): Observable<AxiosResponse<DivisionEntry>>;

  public findDivisionById(
    divisionId: number,
    xTabtAccount?: string,
    xTabtPassword?: string,
    xTabtOnBehalfOf?: string,
    xTabtDatabase?: 'aftt' | 'vttl',
    xTabtSeason?: string,
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
    showDivisionName?: 'no' | 'yes' | 'short',
  ): Observable<any> {
    if (divisionId === null || divisionId === undefined) {
      throw new Error(
        'Required parameter divisionId was null or undefined when calling findDivisionById.',
      );
    }

    const queryParameters = {};
    if (level !== undefined && level !== null) {
      queryParameters['level'] = <any>level;
    }
    if (showDivisionName !== undefined && showDivisionName !== null) {
      queryParameters['showDivisionName'] = <any>showDivisionName;
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
    return this.httpClient.get<DivisionEntry>(
      `${this.basePath}/v1/divisions/${encodeURIComponent(String(divisionId))}`,
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
   * @param divisionId
   * @param xTabtAccount Account to do a request
   * @param xTabtPassword Password of the account
   * @param xTabtOnBehalfOf On Behalf of
   * @param xTabtDatabase Database to query
   * @param xTabtSeason Season name to query
   * @param weekName
   * @param yearDateFrom YYYY-MM-DD
   * @param yearDateTo YYYY-MM-DD
   * @param withDetails
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public findDivisionMatches(
    divisionId: number,
    xTabtAccount?: string,
    xTabtPassword?: string,
    xTabtOnBehalfOf?: string,
    xTabtDatabase?: 'aftt' | 'vttl',
    xTabtSeason?: string,
    weekName?: number,
    yearDateFrom?: string,
    yearDateTo?: string,
    withDetails?: boolean,
  ): Observable<AxiosResponse<Array<TeamMatchesEntry>>>;

  public findDivisionMatches(
    divisionId: number,
    xTabtAccount?: string,
    xTabtPassword?: string,
    xTabtOnBehalfOf?: string,
    xTabtDatabase?: 'aftt' | 'vttl',
    xTabtSeason?: string,
    weekName?: number,
    yearDateFrom?: string,
    yearDateTo?: string,
    withDetails?: boolean,
  ): Observable<any> {
    if (divisionId === null || divisionId === undefined) {
      throw new Error(
        'Required parameter divisionId was null or undefined when calling findDivisionMatches.',
      );
    }

    const queryParameters = {};
    if (weekName !== undefined && weekName !== null) {
      queryParameters['weekName'] = <any>weekName;
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
      `${this.basePath}/v1/divisions/${encodeURIComponent(
        String(divisionId),
      )}/matches`,
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
   * @param divisionId
   * @param xTabtAccount Account to do a request
   * @param xTabtPassword Password of the account
   * @param xTabtOnBehalfOf On Behalf of
   * @param xTabtDatabase Database to query
   * @param xTabtSeason Season name to query
   * @param season
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public findDivisionMembers(
    divisionId: number,
    xTabtAccount?: string,
    xTabtPassword?: string,
    xTabtOnBehalfOf?: string,
    xTabtDatabase?: 'aftt' | 'vttl',
    xTabtSeason?: string,
    season?: number,
  ): Observable<AxiosResponse<Array<MemberResults>>>;

  public findDivisionMembers(
    divisionId: number,
    xTabtAccount?: string,
    xTabtPassword?: string,
    xTabtOnBehalfOf?: string,
    xTabtDatabase?: 'aftt' | 'vttl',
    xTabtSeason?: string,
    season?: number,
  ): Observable<any> {
    if (divisionId === null || divisionId === undefined) {
      throw new Error(
        'Required parameter divisionId was null or undefined when calling findDivisionMembers.',
      );
    }

    const queryParameters = {};
    if (season !== undefined && season !== null) {
      queryParameters['season'] = <any>season;
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
    return this.httpClient.get<Array<MemberResults>>(
      `${this.basePath}/v1/divisions/${encodeURIComponent(
        String(divisionId),
      )}/members/ranking`,
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
   * @param divisionId
   * @param xTabtAccount Account to do a request
   * @param xTabtPassword Password of the account
   * @param xTabtOnBehalfOf On Behalf of
   * @param xTabtDatabase Database to query
   * @param xTabtSeason Season name to query
   * @param weekName
   * @param rankingSystem
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public findDivisionRanking(
    divisionId: number,
    xTabtAccount?: string,
    xTabtPassword?: string,
    xTabtOnBehalfOf?: string,
    xTabtDatabase?: 'aftt' | 'vttl',
    xTabtSeason?: string,
    weekName?: number,
    rankingSystem?: number,
  ): Observable<AxiosResponse<Array<RankingEntry>>>;

  public findDivisionRanking(
    divisionId: number,
    xTabtAccount?: string,
    xTabtPassword?: string,
    xTabtOnBehalfOf?: string,
    xTabtDatabase?: 'aftt' | 'vttl',
    xTabtSeason?: string,
    weekName?: number,
    rankingSystem?: number,
  ): Observable<any> {
    if (divisionId === null || divisionId === undefined) {
      throw new Error(
        'Required parameter divisionId was null or undefined when calling findDivisionRanking.',
      );
    }

    const queryParameters = {};
    if (weekName !== undefined && weekName !== null) {
      queryParameters['weekName'] = <any>weekName;
    }
    if (rankingSystem !== undefined && rankingSystem !== null) {
      queryParameters['rankingSystem'] = <any>rankingSystem;
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
    return this.httpClient.get<Array<RankingEntry>>(
      `${this.basePath}/v1/divisions/${encodeURIComponent(
        String(divisionId),
      )}/ranking`,
      {
        params: queryParameters,
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
