import { Customer } from "@backend/models/entities/customer.entity";
import { Document } from "@backend/models/entities/document.entity";
import { Project } from "@backend/models/entities/project.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectStatus } from "@work-solutions-crm/libs/shared/project/project.dto";
import { StatsDTO } from "@work-solutions-crm/libs/shared/stats/stats.dto";
import { Repository } from "typeorm";

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ) {}

  async getStats(): Promise<StatsDTO> {
    const [projects, activeProjects, documents, customers]: number[] = await Promise.all([
      this.projectRepository.count(),
      this.projectRepository.count({ where: { status: ProjectStatus.ACTIVE } }),
      this.documentRepository.count(),
      this.customerRepository.count()
    ]);

    return {
      projects,
      activeProjects,
      documents,
      customers
    };
  }
}
