package org.regitiny.duchoashop.repository;

import org.regitiny.duchoashop.domain.Productmanager;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Productmanager entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductmanagerRepository extends JpaRepository<Productmanager, Long> {
}
