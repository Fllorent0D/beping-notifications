/**
 * TabT Rest
 * This api is a bridge to the TabT SOAP API. It contacts TabT and cache results in order to reduce latency for some requests. More documentation will come.<br>       The data present in the api such as player names, club names, tournaments or match results are not managed by us. This information is made freely available by the Aile Francophone de Tennis de Table and the Vlaamse Tafeltennisliga. We therefore cannot be held responsible for the publication of this information. If changes need to be made, you should contact the responsible entity.     If you build an application on top of the BePing\'s api, be sure to do at least one of the following things:         <ul><li>If possible, set a X-Application-For header string. Include the name of your application, and a way to contact you in case something would go wrong.<br>       An example user agent string format is, which could result in the following string: beping/2.0.0 (floca.be; florent@floca.be). The use of a header like this isn’t obligated or enforced, but allows for better communication.</li></ul>     
 *
 * The version of the OpenAPI document: 1.9.0
 * Contact: f.cardoen@me.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { HttpService, Inject, Injectable, Optional } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { ClubEntry } from '../model/clubEntry';
import { MemberEntry } from '../model/memberEntry';
import { MemberResults } from '../model/memberResults';
import { TabtException } from '../model/tabtException';
import { TeamEntry } from '../model/teamEntry';
import { Configuration } from '../configuration';


@Injectable()
export class ClubsService {

    protected basePath = 'https://tabt-rest.floca.be';
    public defaultHeaders: Record<string,string> = {};
    public configuration = new Configuration();

    constructor(protected httpClient: HttpService, @Optional() configuration: Configuration) {
        this.configuration = configuration || this.configuration;
        this.basePath = configuration?.basePath || this.basePath;
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        return consumes.includes(form);
    }

    /**
     * 
     * 
     * @param xTabtAccount Account to do a request
     * @param xTabtPassword Password of the account
     * @param xTabtOnBehalfOf On Behalf of
     * @param xTabtDatabase Database to query
     * @param xTabtSeason Season name to query
     * @param clubCategory 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findAllClubs(xTabtAccount?: string, xTabtPassword?: string, xTabtOnBehalfOf?: string, xTabtDatabase?: 'aftt' | 'vttl', xTabtSeason?: string, clubCategory?: 'VLAAMS_BRABANT_BR' | 'BRUSSELS_BRABANT_WALLON' | 'ANTWERP' | 'OOST_VLANDEREN' | 'WEST_VLAANDEREN' | 'LIMBURG' | 'HAINAUT' | 'LUXEMBOURG' | 'LIEGE' | 'NAMUR' | 'VTTL' | 'AFTT' | 'FRBTT', ): Observable<AxiosResponse<Array<ClubEntry>>>;
    public findAllClubs(xTabtAccount?: string, xTabtPassword?: string, xTabtOnBehalfOf?: string, xTabtDatabase?: 'aftt' | 'vttl', xTabtSeason?: string, clubCategory?: 'VLAAMS_BRABANT_BR' | 'BRUSSELS_BRABANT_WALLON' | 'ANTWERP' | 'OOST_VLANDEREN' | 'WEST_VLAANDEREN' | 'LIMBURG' | 'HAINAUT' | 'LUXEMBOURG' | 'LIEGE' | 'NAMUR' | 'VTTL' | 'AFTT' | 'FRBTT', ): Observable<any> {







        let queryParameters = {};
        if (clubCategory !== undefined && clubCategory !== null) {
            queryParameters['clubCategory'] = <any>clubCategory;
        }

        let headers = this.defaultHeaders;
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
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers['Accept'] = httpHeaderAcceptSelected;
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];
        return this.httpClient.get<Array<ClubEntry>>(`${this.basePath}/v1/clubs`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers
            }
        );
    }
    /**
     * 
     * 
     * @param clubIndex 
     * @param xTabtAccount Account to do a request
     * @param xTabtPassword Password of the account
     * @param xTabtOnBehalfOf On Behalf of
     * @param xTabtDatabase Database to query
     * @param xTabtSeason Season name to query
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findClubById(clubIndex: string, xTabtAccount?: string, xTabtPassword?: string, xTabtOnBehalfOf?: string, xTabtDatabase?: 'aftt' | 'vttl', xTabtSeason?: string, ): Observable<AxiosResponse<ClubEntry>>;
    public findClubById(clubIndex: string, xTabtAccount?: string, xTabtPassword?: string, xTabtOnBehalfOf?: string, xTabtDatabase?: 'aftt' | 'vttl', xTabtSeason?: string, ): Observable<any> {

        if (clubIndex === null || clubIndex === undefined) {
            throw new Error('Required parameter clubIndex was null or undefined when calling findClubById.');
        }






        let headers = this.defaultHeaders;
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
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers['Accept'] = httpHeaderAcceptSelected;
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];
        return this.httpClient.get<ClubEntry>(`${this.basePath}/v1/clubs/${encodeURIComponent(String(clubIndex))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers
            }
        );
    }
    /**
     * 
     * 
     * @param clubIndex 
     * @param xTabtAccount Account to do a request
     * @param xTabtPassword Password of the account
     * @param xTabtOnBehalfOf On Behalf of
     * @param xTabtDatabase Database to query
     * @param xTabtSeason Season name to query
     * @param playerCategory 
     * @param uniqueIndex 
     * @param nameSearch 
     * @param extendedInformation 
     * @param rankingPointsInformation 
     * @param withResults 
     * @param withOpponentRankingEvaluation 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findClubMembers(clubIndex: string, xTabtAccount?: string, xTabtPassword?: string, xTabtOnBehalfOf?: string, xTabtDatabase?: 'aftt' | 'vttl', xTabtSeason?: string, playerCategory?: 'MEN' | 'WOMEN' | 'VETERANS' | 'VETERANS_WOMEN' | 'YOUTH', uniqueIndex?: number, nameSearch?: string, extendedInformation?: boolean, rankingPointsInformation?: boolean, withResults?: boolean, withOpponentRankingEvaluation?: boolean, ): Observable<AxiosResponse<Array<MemberEntry>>>;
    public findClubMembers(clubIndex: string, xTabtAccount?: string, xTabtPassword?: string, xTabtOnBehalfOf?: string, xTabtDatabase?: 'aftt' | 'vttl', xTabtSeason?: string, playerCategory?: 'MEN' | 'WOMEN' | 'VETERANS' | 'VETERANS_WOMEN' | 'YOUTH', uniqueIndex?: number, nameSearch?: string, extendedInformation?: boolean, rankingPointsInformation?: boolean, withResults?: boolean, withOpponentRankingEvaluation?: boolean, ): Observable<any> {

        if (clubIndex === null || clubIndex === undefined) {
            throw new Error('Required parameter clubIndex was null or undefined when calling findClubMembers.');
        }













        let queryParameters = {};
        if (playerCategory !== undefined && playerCategory !== null) {
            queryParameters['playerCategory'] = <any>playerCategory;
        }
        if (uniqueIndex !== undefined && uniqueIndex !== null) {
            queryParameters['uniqueIndex'] = <any>uniqueIndex;
        }
        if (nameSearch !== undefined && nameSearch !== null) {
            queryParameters['nameSearch'] = <any>nameSearch;
        }
        if (extendedInformation !== undefined && extendedInformation !== null) {
            queryParameters['extendedInformation'] = <any>extendedInformation;
        }
        if (rankingPointsInformation !== undefined && rankingPointsInformation !== null) {
            queryParameters['rankingPointsInformation'] = <any>rankingPointsInformation;
        }
        if (withResults !== undefined && withResults !== null) {
            queryParameters['withResults'] = <any>withResults;
        }
        if (withOpponentRankingEvaluation !== undefined && withOpponentRankingEvaluation !== null) {
            queryParameters['withOpponentRankingEvaluation'] = <any>withOpponentRankingEvaluation;
        }

        let headers = this.defaultHeaders;
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
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers['Accept'] = httpHeaderAcceptSelected;
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];
        return this.httpClient.get<Array<MemberEntry>>(`${this.basePath}/v1/clubs/${encodeURIComponent(String(clubIndex))}/members`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers
            }
        );
    }
    /**
     * 
     * 
     * @param clubIndex 
     * @param xTabtAccount Account to do a request
     * @param xTabtPassword Password of the account
     * @param xTabtOnBehalfOf On Behalf of
     * @param xTabtDatabase Database to query
     * @param xTabtSeason Season name to query
     * @param season 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findClubTeams(clubIndex: string, xTabtAccount?: string, xTabtPassword?: string, xTabtOnBehalfOf?: string, xTabtDatabase?: 'aftt' | 'vttl', xTabtSeason?: string, season?: number, ): Observable<AxiosResponse<Array<TeamEntry>>>;
    public findClubTeams(clubIndex: string, xTabtAccount?: string, xTabtPassword?: string, xTabtOnBehalfOf?: string, xTabtDatabase?: 'aftt' | 'vttl', xTabtSeason?: string, season?: number, ): Observable<any> {

        if (clubIndex === null || clubIndex === undefined) {
            throw new Error('Required parameter clubIndex was null or undefined when calling findClubTeams.');
        }







        let queryParameters = {};
        if (season !== undefined && season !== null) {
            queryParameters['season'] = <any>season;
        }

        let headers = this.defaultHeaders;
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
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers['Accept'] = httpHeaderAcceptSelected;
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];
        return this.httpClient.get<Array<TeamEntry>>(`${this.basePath}/v1/clubs/${encodeURIComponent(String(clubIndex))}/teams`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers
            }
        );
    }
    /**
     * 
     * 
     * @param clubIndex 
     * @param teamId 
     * @param xTabtAccount Account to do a request
     * @param xTabtPassword Password of the account
     * @param xTabtOnBehalfOf On Behalf of
     * @param xTabtDatabase Database to query
     * @param xTabtSeason Season name to query
     * @param season 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findClubTeamsMemberRanking(clubIndex: string, teamId: string, xTabtAccount?: string, xTabtPassword?: string, xTabtOnBehalfOf?: string, xTabtDatabase?: 'aftt' | 'vttl', xTabtSeason?: string, season?: number, ): Observable<AxiosResponse<Array<MemberResults>>>;
    public findClubTeamsMemberRanking(clubIndex: string, teamId: string, xTabtAccount?: string, xTabtPassword?: string, xTabtOnBehalfOf?: string, xTabtDatabase?: 'aftt' | 'vttl', xTabtSeason?: string, season?: number, ): Observable<any> {

        if (clubIndex === null || clubIndex === undefined) {
            throw new Error('Required parameter clubIndex was null or undefined when calling findClubTeamsMemberRanking.');
        }

        if (teamId === null || teamId === undefined) {
            throw new Error('Required parameter teamId was null or undefined when calling findClubTeamsMemberRanking.');
        }







        let queryParameters = {};
        if (season !== undefined && season !== null) {
            queryParameters['season'] = <any>season;
        }

        let headers = this.defaultHeaders;
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
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers['Accept'] = httpHeaderAcceptSelected;
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];
        return this.httpClient.get<Array<MemberResults>>(`${this.basePath}/v1/clubs/${encodeURIComponent(String(clubIndex))}/teams/${encodeURIComponent(String(teamId))}/ranking`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers
            }
        );
    }
    /**
     * 
     * 
     * @param clubIndex 
     * @param xTabtAccount Account to do a request
     * @param xTabtPassword Password of the account
     * @param xTabtOnBehalfOf On Behalf of
     * @param xTabtDatabase Database to query
     * @param xTabtSeason Season name to query
     * @param season 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findMembersRanking(clubIndex: string, xTabtAccount?: string, xTabtPassword?: string, xTabtOnBehalfOf?: string, xTabtDatabase?: 'aftt' | 'vttl', xTabtSeason?: string, season?: number, ): Observable<AxiosResponse<Array<MemberResults>>>;
    public findMembersRanking(clubIndex: string, xTabtAccount?: string, xTabtPassword?: string, xTabtOnBehalfOf?: string, xTabtDatabase?: 'aftt' | 'vttl', xTabtSeason?: string, season?: number, ): Observable<any> {

        if (clubIndex === null || clubIndex === undefined) {
            throw new Error('Required parameter clubIndex was null or undefined when calling findMembersRanking.');
        }







        let queryParameters = {};
        if (season !== undefined && season !== null) {
            queryParameters['season'] = <any>season;
        }

        let headers = this.defaultHeaders;
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
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers['Accept'] = httpHeaderAcceptSelected;
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];
        return this.httpClient.get<Array<MemberResults>>(`${this.basePath}/v1/clubs/${encodeURIComponent(String(clubIndex))}/members/ranking`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers
            }
        );
    }
}
