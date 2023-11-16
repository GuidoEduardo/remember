import { Member } from "../../../../services/member-service/entities/member";
import { MemberRepository } from "../../../../services/member-service/repositories/memberRepository";

export class MemberRepositoryImpl implements MemberRepository {
	async create(member: Member): Promise<Member> {

	}
}
